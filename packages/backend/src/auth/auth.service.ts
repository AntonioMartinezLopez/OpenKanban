import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Ctx from 'src/types/context.types';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginResult } from './dto/login-result';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOneByName(username);

    // // evaluate password
    // const match = await bcrypt.compare(pwd, foundUser.password);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(loginInput: LoginUserInput, context: Ctx): Promise<LoginResult> {
    // Check if a cookie was sent during login request
    const cookies = context.req.cookies;
    if (cookies)
      console.log(`cookie available at login: ${JSON.stringify(cookies)}`);

    const user = await this.validateUser(
      loginInput.username,
      loginInput.password,
    );

    if (!user) {
      return null;
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

    // load the refreshtoken array
    let newRefreshTokenArray = !cookies?.jwt
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.jwt);

    //Before adding to response, check if cookies containing jwt is used by other users
    /* 
      Scenario added here: 
          1) User logs in but never uses RT and does not logout 
          2) RT is stolen
          3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
    */
    if (cookies.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await this.userService
        .findAll()
        .filter((user) => user.refreshToken.includes(refreshToken));

      // Detected refresh token reuse!
      if (!foundToken) {
        console.log('attempted refresh token reuse at login!');

        //*TODO*: delete all refreshtoken in affected users
        // put code in here

        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      context.res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    }

    // Saving refreshToken with current user
    const result = this.userService.update(user.userId, {
      refreshToken: [...newRefreshTokenArray, newRefreshToken],
    });
    console.log(result);

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

  async logout(context: Ctx): Promise<number | undefined> {
    //load cookie
    const refreshToken = context.req.cookies.jwt;
    if (!refreshToken) {
      return null;
    }

    const user = this.userService.findOneById(
      parseInt(this.jwtService.decode(refreshToken)['userId']),
    );

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

    const result = this.userService.update(user.userId, {
      refreshToken: refreshTokenArray,
    });

    console.log('LOGOUT!', result);

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
      return null;
    }

    //delete cookie
    context.res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    //search for client that has the refresh token
    const foundUser = this.userService
      .findAll()
      .find((user) => user.refreshToken.includes(refreshToken));

    // Detect refresh token reuse
    if (!foundUser) {
      this.jwtService
        .verifyAsync(refreshToken)
        .then((decodedJWT) => {
          console.log('Attempted refresh token reuse!');
          const compUser = this.userService.findOneByName(decodedJWT.username);
          if (compUser) {
            const result = this.userService.update(compUser.userId, {
              refreshToken: [],
            });
            console.log(result);
          }
        })
        .catch((err) => {
          console.log('ERROR: ', err);
          return null;
        });
      return null;
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken,
    );

    try {
      const decodedJwt = this.jwtService.verify(refreshToken);

      //return 403 when username not euwal to username within jwt
      if (foundUser.username !== decodedJwt.username) return null;

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

      const result = this.userService.update(foundUser.userId, {
        refreshToken: [...newRefreshTokenArray, newRefreshToken],
      });
      console.log(result);

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
      console.log(error, 'expired refresh token');
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = this.userService.update(foundUser.userId, {
        refreshToken: [...newRefreshTokenArray],
      });
      console.log(result);
      return null;
    }
  }
}
