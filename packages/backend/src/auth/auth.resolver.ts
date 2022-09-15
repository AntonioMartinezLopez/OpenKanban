import { Args, Context, Query, Resolver } from '@nestjs/graphql';
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
    return this.authService.login(loginUserInput, context);
  }

  @Query(() => Boolean, { nullable: true, name: 'logout' })
  async logout(@Context() context: Ctx): Promise<boolean> {
    const result = await this.authService.logout(context);
    return result ? true : false;
  }

  @Query(() => LoginResult, { nullable: true, name: 'refreshToken' })
  async refreshToken(@Context() context: Ctx): Promise<LoginResult> {
    return this.authService.refreshToken(context);
  }
}
