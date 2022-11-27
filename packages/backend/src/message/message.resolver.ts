import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

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
}
