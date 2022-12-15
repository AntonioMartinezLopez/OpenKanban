import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/entities/group.entity';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/role.enum';
import { OwnGuard } from './guards/own.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly groupsService: GroupsService,
  ) {}

  @Mutation(() => User, { name: 'register' })
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
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOneById(id);
  }

  @Query(() => User, { name: 'whoAmI' })
  @UseGuards(GqlJwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.userService.findOneById(user.userId);
  }

  @UseGuards(GqlJwtAuthGuard, RolesGuard, OwnGuard)
  @Roles(Role.Admin, Role.User)
  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @Mutation(() => User, { name: 'removeUser' })
  @UseGuards(GqlJwtAuthGuard)
  removeUser(@CurrentUser() user: User) {
    return this.userService.remove(user.userId);
  }

  @ResolveField(() => [Group])
  async groups(@Parent() user: User): Promise<Group[]> {
    const { userId } = user;
    return this.groupsService.findAllGroupsFromUser(userId);
  }
}
