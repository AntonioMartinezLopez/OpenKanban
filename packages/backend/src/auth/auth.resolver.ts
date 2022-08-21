import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';
import Ctx from 'src/types/context.types';
import { AuthService } from './auth.service';
import { LoginResult } from './dto/login-result';
import { LoginUserInput } from './dto/login-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => LoginResult, { name: 'login' })
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: Ctx,
  ): Promise<LoginResult> {
    const result = await this.authService.login(loginUserInput, context);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
  }

  @Query(() => Boolean, { nullable: true, name: 'logout' })
  async logout(@Context() context: Ctx): Promise<boolean> {
    const result = this.authService.logout(context);
    return result ? true : false;
  }

  @Query(() => LoginResult, { nullable: true, name: 'refreshToken' })
  async refreshToken(@Context() context: Ctx): Promise<LoginResult> {
    const result = await this.authService.refreshToken(context);
    if (result) {
      return result; // return result ? true : false;
    }
    throw new ForbiddenError('invalid or missing refresh token');
  }

  //   // There is no username guard here because if the person has the token, they can be any user
  //   @Query('refreshToken')
  //   @UseGuards(GqlJwtAuthGuard)
  //   async refreshToken(@Context('req') request: any): Promise<string> {
  //     const user: UserDocument = request.user;
  //     if (!user)
  //       throw new AuthenticationError(
  //         'Could not log-in with the provided credentials',
  //       );
  //     const result = await this.authService.createJwt(user);
  //     if (result) return result.token;
  //     throw new AuthenticationError(
  //       'Could not log-in with the provided credentials',
  //     );
  //   }
}
