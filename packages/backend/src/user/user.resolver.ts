import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlJwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlJwtAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOneById(id);
  }

  @Query(() => User, { name: 'whoAmI' })
  @UseGuards(GqlJwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOneById(user.userId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
