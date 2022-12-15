import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardService } from 'src/board/board.service';
import { Board } from 'src/board/entities/board.entity';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { Repository } from 'typeorm';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  private readonly logger = new Logger(GroupsService.name);

  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(BoardService)
    private boardService: BoardService,
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    // find creator of group und set him as first user within group
    const user = await this.userService.findOneById(createGroupInput.userId);

    const newGroup = new Group();
    newGroup.name = createGroupInput.name;
    newGroup.description = createGroupInput.description;
    newGroup.users = [user];
    newGroup.creator = user;

    // direct initialization of a board
    if (createGroupInput.boardname && createGroupInput.boardDescription) {
      const newBoard = new Board();
      newBoard.name = createGroupInput.boardname;
      newBoard.description = createGroupInput.boardDescription;
      newGroup.board = newBoard;
    }

    return this.groupRepository.save(newGroup);
  }

  async addUser(groupdId: string, userId: string): Promise<Group> {
    const user = await this.userService.findOneById(userId);

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: groupdId },
    });

    if (!group || !user) {
      throw new NotFoundException('Unknown Group Id or user Id');
    }

    group.users = [...group.users, user];

    return this.groupRepository.save(group);
  }

  async removeUser(groupdId: string, userId: string): Promise<Group> {
    const user = await this.userService.findOneById(userId);

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: groupdId },
    });

    if (!group || !user) {
      throw new NotFoundException('Unknown Group Id or user Id');
    }

    group.users = group.users.filter((user) => user.userId !== userId);

    return this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findAllGroupsFromUser(userId: string): Promise<Group[]> {
    return this.groupRepository.find({
      relations: ['users'],
      where: { users: { userId: userId } },
    });
  }

  findOnebyId(groupId: string): Promise<Group> {
    return this.groupRepository.findOneBy({ id: groupId });
  }

  findOnebyName(groupName: string): Promise<Group> {
    return this.groupRepository.findOneBy({ name: groupName });
  }

  async update(updateGroupInput: UpdateGroupInput): Promise<Group> {
    let group = await this.groupRepository.findOneBy({
      id: updateGroupInput.id,
    });

    if (!group) {
      throw new NotFoundException('Unknown Group Id');
    }
    group = { ...group, ...updateGroupInput };

    return this.groupRepository.save(group);
  }

  async remove(callingUser: string, groupId: string) {
    const group = await this.groupRepository.findOne({
      relations: ['creator', 'board'],
      where: { id: groupId },
    });

    this.logger.log(JSON.stringify(group));
    if (!group) {
      throw new NotFoundException('Unknown Group Id');
    }

    if (group.creator.userId && group.creator.userId !== callingUser) {
      throw new ForbiddenException('Only creator itself must delete a group');
    }

    // delete corresponding board instance
    await this.boardService.remove(group.board.id);
    return this.groupRepository.remove(group);
  }

  // Field resolver functions
  async resolveBoard(groupId: string): Promise<Board> {
    const group = await this.groupRepository.findOne({
      relations: ['board'],
      where: { id: groupId },
    });

    return group.board;
  }

  async getCreator(groupId: string): Promise<User> {
    const group = await this.groupRepository.findOne({
      relations: ['creator'],
      where: { id: groupId },
    });
    return group.creator;
  }

  async messages(groupId: string): Promise<Message[]> {
    const group = await this.groupRepository.findOne({
      relations: ['messages'],
      where: { id: groupId },
    });

    return group.messages;
  }
}
