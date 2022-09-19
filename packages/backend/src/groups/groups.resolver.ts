import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { User } from 'src/user/entities/user.entity';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/user/decorators/currentUser.decorator';

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupsService) {}

  @Mutation(() => Group)
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupsService.create(createGroupInput);
  }

  @Mutation(() => Group)
  addUserToGroup(
    @Args('groupId') groupId: string,
    @Args('userId') userId: string,
  ) {
    return this.groupsService.addUser(groupId, userId);
  }

  @Mutation(() => Group)
  removeUserToGroup(
    @Args('groupId') groupId: string,
    @Args('userId') userId: string,
  ) {
    return this.groupsService.removeUser(groupId, userId);
  }

  @Query(() => [Group], { name: 'groups' })
  findAll() {
    return this.groupsService.findAll();
  }

  @Query(() => Group, { name: 'group', nullable: true })
  findOne(
    @Args('id', { nullable: true }) id: string,
    @Args('name', { nullable: true }) name: string,
  ) {
    if (id) {
      return this.groupsService.findOnebyId(id);
    } else if (name) {
      return this.groupsService.findOnebyName(name);
    }
    throw new ForbiddenException('Missing argmuent');
  }

  @Mutation(() => Group)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupsService.update(updateGroupInput);
  }

  // Deletion of a group is only possible by its creator
  @Mutation(() => Group)
  @UseGuards(GqlJwtAuthGuard)
  removeGroup(@CurrentUser() user: User, @Args('groupId') groupId: string) {
    return this.groupsService.remove(user.userId, groupId);
  }

  // use groupService for querying creator user as its an unidirectional relation
  @ResolveField(() => User, { nullable: true })
  async creator(@Parent() group: Group): Promise<User> {
    return this.groupsService.getCreator(group.id);
  }
}
