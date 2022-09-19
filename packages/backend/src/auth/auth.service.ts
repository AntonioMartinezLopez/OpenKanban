import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Ctx from 'src/types/context.types';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResult } from './dto/login-result';
import { LoginUserInput } from './dto/login-user.input';
import * as bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  isTokenValid(token: string): boolean {
    let validToken = false;
    this.jwtService
      .verifyAsync(token)
      .then(() => {
        validToken = true;
      })
      .catch(() => {
        this.logger.error('INVALID TOKEN');
        validToken = false;
      });

    return validToken;
  }

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByName(username);

    if (!user) {
      return null;
    } else {
      // evaluate password
      const match = await bcrypt.compare(pass, user.password);

      if (match) {
        return user;
      }
    }
    return null;
  }

  async login(loginInput: LoginUserInput, context: Ctx): Promise<LoginResult> {
    // Check if a cookie was sent during login request
    const cookies = context.req.cookies;

    const user = await this.validateUser(
      loginInput.username,
      loginInput.password,
    );

    if (!user) {
      throw new AuthenticationError(
        'Could not log-in with the provided credentials',
      );
    }

    // create JWT
    const accessToken = this.jwtService.sign({
      username: user.username,
      userId: user.userId,
    });

    const newRefreshToken = this.jwtService.sign(
      { userId: user.userId, username: user.username },
      { expiresIn: '1d' },
    );

    // load the refreshtoken array and check also for invalid tokens
    const newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken.filter((rt) => this.isTokenValid(rt))
      : user.refreshToken.filter(
          (rt) => rt !== cookies.jwt || this.isTokenValid(rt),
        );

    //Before adding to response, check if cookies containing jwt is used by other users
    /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    if (cookies.jwt) {
      const refreshToken = cookies.jwt;
      const foundUser = await this.userService.findUserByRefreshToken(
        refreshToken,
      );

      this.logger.log(
        'User ' + 'already logged in. Setting new refresh token: ',
      );

      // .findAll()
      // .filter((user) => user.refreshToken.includes(refreshToken));

      // Detected refresh token reuse!
      if (!foundUser || foundUser.username !== user.username) {
        this.logger.log('Attempted refresh token reuse at login!');

        //*TODO*: delete all refreshtoken in affected user
        // put code in here
        const decodedJWT: any = this.jwtService.decode(refreshToken);

        const compUser = await this.userService.findOneByName(
          decodedJWT.username,
        );
        if (compUser) {
          await this.userService.updateTokens({
            userId: compUser.userId,
            refreshToken: [],
          });
        }
      }

      context.res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    const result = await this.userService.updateTokens({
      userId: user.userId,
      refreshToken: [...newRefreshTokenArray, newRefreshToken],
    });

    this.logger.log(
      'LOGIN:' +
        JSON.stringify({ user: result.username, tokens: result.refreshToken }),
    );

    // Creates Secure Cookie with refresh token
    context.res.cookie('jwt', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      access_token: accessToken,
    };
  }

  async logout(context: Ctx): Promise<string | undefined> {
    //load cookie
    const refreshToken = context.req.cookies.jwt;
    if (!refreshToken) {
      return null;
    }

    const extractedUserId = this.jwtService.decode(refreshToken)['userId'];

    const user = await this.userService.findOneById(extractedUserId);

    //if no user found
    if (!user) {
      context.res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return null;
    }

    // else delete freshtoken from user
    const refreshTokenArray = user.refreshToken.filter(
      (token) => token !== refreshToken,
    );

    const result = await this.userService.updateTokens({
      userId: user.userId,
      refreshToken: refreshTokenArray,
    });

    this.logger.log(
      'LOGOUT:' +
        JSON.stringify({ user: result.username, tokens: result.refreshToken }),
    );

    //clear cookies
    context.res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return user.userId;
  }

  async refreshToken(context: Ctx): Promise<LoginResult> {
    // load cookie from request
    const refreshToken = context.req.cookies.jwt;
    if (!refreshToken) {
      throw new AuthenticationError('invalid or missing refresh token');
    }

    //delete cookie
    context.res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    //search for client that has the refresh token
    const foundUser = await this.userService.findUserByRefreshToken(
      refreshToken,
    );
    // const foundUser = await this.userService
    //   .findAll()
    //   .find((user) => user.refreshToken.includes(refreshToken));

    // Detect refresh token reuse
    if (!foundUser) {
      this.jwtService
        .verifyAsync(refreshToken)
        .then(async (decodedJWT) => {
          this.logger.log('Attempted refresh token reuse!');
          const compUser = await this.userService.findOneByName(
            decodedJWT.username,
          );
          if (compUser) {
            await this.userService.updateTokens({
              userId: compUser.userId,
              refreshToken: [],
            });
          }
        })
        .catch((err) => {
          this.logger.error('ERROR: ' + err);
          //return null;
        });
      throw new AuthenticationError('refresh token reuse detected');
    }

    let newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    try {
      const decodedJwt = this.jwtService.verify(refreshToken);

      //return 403 when userid not equal to userid within jwt
      //if (foundUser.userId !== decodedJwt.userId) return null;

      //if username differs ( e.g. by changing it), make all existing refresh tokens invalid
      if (foundUser.username !== decodedJwt.username) {
        newRefreshTokenArray = [];
      }

      //generate new access token
      const accessToken = this.jwtService.sign({
        username: foundUser.username,
        userId: foundUser.userId,
      });

      //generate new refresh token
      const newRefreshToken = this.jwtService.sign(
        {
          username: foundUser.username,
          userId: foundUser.userId,
        },
        { expiresIn: '1d' },
      );

      const result = await this.userService.updateTokens({
        userId: foundUser.userId,
        refreshToken: [...newRefreshTokenArray, newRefreshToken],
      });

      this.logger.log(
        'REFRESH TOKEN:' +
          JSON.stringify({
            user: result.username,
            tokens: result.refreshToken,
          }),
      );

      // set cookie
      context.res.cookie('jwt', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
      });

      //return access token
      return { access_token: accessToken } as LoginResult;
    } catch (error) {
      this.logger.error(error);
      foundUser.refreshToken = [...newRefreshTokenArray];
      await this.userService.updateTokens({
        userId: foundUser.userId,
        refreshToken: [...newRefreshTokenArray],
      });
      throw new AuthenticationError('invalid refresh token');
    }
  }
}
