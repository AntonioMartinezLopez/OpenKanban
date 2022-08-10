import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-express';
import { AuthService } from './auth.service';
import { LoginResult } from './dto/login-result';
import { LoginUserInput } from './dto/login-user.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => LoginResult, { name: 'login' })
  async login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResult> {
    const result = await this.authService.login(loginUserInput);
    if (result) return result;
    throw new AuthenticationError(
      'Could not log-in with the provided credentials',
    );
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
