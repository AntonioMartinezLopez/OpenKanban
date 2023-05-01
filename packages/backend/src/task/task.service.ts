import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardcolumnService } from 'src/boardcolumn/boardcolumn.service';
import { Group } from 'src/groups/entities/group.entity';
import { Label } from 'src/label/entities/label.entity';
import { LabelService } from 'src/label/label.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { QueryTasksInput, QueryTasksResult } from './dto/query-tasks.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
    @Inject(forwardRef(() => BoardcolumnService))
    private boardColumnService: BoardcolumnService,
    @Inject(UserService)
    private userService: UserService,
    @Inject(LabelService)
    private labelService: LabelService,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    // search for board
    const group = await this.groupRepository.findOneBy({
      id: createTaskInput.groupId,
    });

    if (!group) {
      throw new NotFoundException('Unknown board Id');
    }

    // search for assigned users
    const users = [] as User[];
    for (const userId of createTaskInput.assignees) {
      const userFound = await this.userService.findOneById(userId);
      if (!userFound) {
        throw new NotFoundException('Unknown user Id');
      }

      users.push(userFound);
    }

    // search for labels
    const labels = [] as Label[];
    for (const labelId of createTaskInput.labels) {
      const labelFound = await this.labelService.findOne(labelId);
      if (!labelFound) {
        throw new NotFoundException('Unknown label Id');
      }

      labels.push(labelFound);
    }

    const newTask = new Task();
    newTask.name = createTaskInput.name;
    newTask.description = createTaskInput.description;
    newTask.weight = createTaskInput.maxWeight;
    newTask.group = group;
    newTask.assignees = users;
    newTask.labels = labels;

    return this.taskRepository.save(newTask);
  }

  async findAllTaskFromBoardColumn(queryTaskInput: QueryTasksInput) {
    // fetch all data from board
    const tasks = await this.taskRepository.find({
      relations: ['boardColumn', 'group'],
      where: {
        boardColumn: { name: queryTaskInput.boardColumnName },
        group: {
          id: queryTaskInput.groupId,
        },
      },
    });

    // cut the result based on given pageSize and page number
    const start = queryTaskInput.page * queryTaskInput.pageSize;
    const end = start + queryTaskInput.pageSize;

    const result = new QueryTasksResult();
    result.tasks = tasks.slice(start, end);
    result.hasMore = end < tasks.length;

    console.error(JSON.stringify(result));
    return result;
  }

  findOne(taskId: string) {
    return this.taskRepository.findOneBy({ id: taskId });
  }

  async update(updateTaskInput: UpdateTaskInput) {
    const { id, assignees, labels, ...props } = updateTaskInput;

    let task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException('Unknown Task id');
    }

    // search for assigned users
    const assignedUsers = [] as User[];
    for (const userId of assignees) {
      const userFound = await this.userService.findOneById(userId);
      if (!userFound) {
        throw new NotFoundException('Unknown user Id');
      }

      assignedUsers.push(userFound);
    }

    // search for labels
    const newLabels = [] as Label[];
    for (const labelId of updateTaskInput.labels) {
      const labelFound = await this.labelService.findOne(labelId);
      if (!labelFound) {
        throw new NotFoundException('Unknown label Id');
      }

      newLabels.push(labelFound);
    }

    task = { ...task, ...props, assignees: assignedUsers, labels: newLabels };

    // check if new column was set
    if (updateTaskInput.boardColumnId) {
      const boardColumn = await this.boardColumnService.findOne(
        updateTaskInput.boardColumnId,
      );
      task.boardColumn = boardColumn;
    } else {
      task.boardColumn = null;
    }

    return this.taskRepository.save(task);
  }

  async remove(taskId: string) {
    const task = await this.taskRepository.findOneBy({ id: taskId });

    if (!task) {
      throw new NotFoundException('Unknown Task id');
    }

    return this.taskRepository.remove(task);
  }

  // resolver
  async getAssignees(taskid: string): Promise<User[]> {
    const task = await this.taskRepository.findOne({
      relations: ['assignees'],
      where: { id: taskid },
    });

    return task.assignees;
  }

  async getLabels(taskid: string): Promise<Label[]> {
    const task = await this.taskRepository.findOne({
      relations: ['labels'],
      where: { id: taskid },
    });

    return task.labels;
  }
}
