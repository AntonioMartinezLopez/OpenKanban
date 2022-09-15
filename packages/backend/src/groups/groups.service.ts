import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

    return this.groupRepository.save(newGroup);
  }

  async addUser(groupdId: string, userId: string): Promise<Group> {
    const user = await this.userService.findOneById(userId);

    const group = await this.groupRepository.findOne({
      relations: ['users'],
      where: { id: groupdId },
    });

    group.users = [...group.users, user];

    return this.groupRepository.save(group);
  }

  findAll() {
    return `This action returns all groups`;
  }

  async findAllGroupsFromUser(userId: string): Promise<Group[]> {
    return this.groupRepository.find({
      relations: ['users'],
      where: { users: { userId: userId } },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateGroupInput: UpdateGroupInput) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
