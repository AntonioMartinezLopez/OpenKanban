import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(createGroupInput: CreateGroupInput): Promise<Group> {
    // find creator of group und set him as first user within group
    const user = await this.userService.findOneById(createGroupInput.userId);

    const newGroup = new Group();
    newGroup.name = createGroupInput.name;
    newGroup.description = createGroupInput.description;
    newGroup.users = [user];
    newGroup.creator = user;

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

  // use groupService for querying creator user as its an unidirectional relation
  async getCreator(groupId: string): Promise<User> {
    const group = await this.groupRepository.findOne({
      relations: ['creator'],
      where: { id: groupId },
    });
    return group.creator;
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
      relations: ['creator'],
      where: { id: groupId },
    });

    this.logger.log(JSON.stringify(group));
    if (!group) {
      throw new NotFoundException('Unknown Group Id');
    }

    if (group.creator.userId && group.creator.userId !== callingUser) {
      throw new ForbiddenException('Only creator itself must delete a group');
    }
    return this.groupRepository.remove(group);
  }
}
