import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { UserService } from 'src/user/user.service';
import { GroupsService } from 'src/groups/groups.service';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/groups/entities/group.entity';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UserService,
    private readonly groupsService: GroupsService,
  ) {}

  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'message' })
  findAll(@Args('groupId', { type: () => String }) groupId: string) {
    return this.messageService.findAll(groupId);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messageService.update(updateMessageInput);
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => String }) messageId: string) {
    return this.messageService.remove(messageId);
  }

  //resolve functions
  @ResolveField(() => User, { nullable: true })
  async creator(@Parent() message: Message): Promise<User> {
    return this.userService.findOneById(message.creator.userId);
  }

  //resolve functions
  @ResolveField(() => Group, { nullable: true })
  async group(@Parent() message: Message): Promise<Group> {
    return this.groupsService.findOnebyId(message.group.id);
  }
}
