import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { GroupsService } from 'src/groups/groups.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @Inject(UserService)
    private userService: UserService,
    @Inject(GroupsService)
    private groupService: GroupsService,
    @Inject('PUB_SUB') private pubSub: RedisPubSub,
  ) {}

  async create(createMessageInput: CreateMessageInput) {
    // find creator of group und set him as first user within group
    const user = await this.userService.findOneById(
      createMessageInput.creatorId,
    );

    const group = await this.groupService.findOnebyId(
      createMessageInput.groupId,
    );

    if (!user || !group) {
      throw new NotFoundException('Unknown Group Id or user Id');
    }

    const newMessage = new Message();
    newMessage.text = createMessageInput.text;
    newMessage.creator = user;
    newMessage.group = group;

    const savedMessage = await this.messageRepository.save(newMessage);
    // publish to subscribers of the group
    this.pubSub.publish('newMessage', { newMessage: savedMessage });
    return savedMessage;
  }

  findAll(groupId: string) {
    return this.messageRepository.find({ where: { group: { id: groupId } } });
  }

  async update(updateMessageInput: UpdateMessageInput) {
    const message = await this.messageRepository.findOneBy({
      id: updateMessageInput.messageId,
    });

    if (!message) {
      throw new NotFoundException('Unknown message id');
    }

    message.text = updateMessageInput.text;

    return this.messageRepository.save(message);
  }

  async remove(messageId: string) {
    const message = await this.messageRepository.findOneBy({
      id: messageId,
    });

    if (!message) {
      throw new NotFoundException('Unknown message id');
    }

    return this.messageRepository.remove(message);
  }
}
