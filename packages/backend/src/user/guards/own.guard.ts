import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/auth/roles/role.enum';

@Injectable()
export class OwnGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const context = GqlExecutionContext.create(ctx);

    const user = context.getContext().req.user;
    const { userId } = context.getArgs().updateUserInput;
    console.error(user);
    console.error(userId);

    if (user.role === Role.Admin) {
      return true;
    }

    return user.userId === userId;
  }
}
