import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';
import { BoardcolumnService } from 'src/boardcolumn/boardcolumn.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @Inject(forwardRef(() => BoardcolumnService))
    private boardColumnService: BoardcolumnService,
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    // search for board
    const board = await this.boardRepository.findOneBy({
      id: createTaskInput.boardId,
    });

    if (!board) {
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

    const newTask = new Task();
    newTask.name = createTaskInput.name;
    newTask.description = createTaskInput.description;
    newTask.weight = createTaskInput.maxWeight;
    newTask.board = board;
    newTask.assignees = users;

    return this.taskRepository.save(newTask);
  }

  // async findAllTaskFromBoard(boardId: string) {
  //   return this.taskRepository.find({
  //     relations: ['board'],
  //     where: { board: { id: boardId } },
  //   });
  // }

  findOne(taskId: string) {
    return this.taskRepository.findOneBy({ id: taskId });
  }

  async update(updateTaskInput: UpdateTaskInput) {
    const { id, assignees, ...props } = updateTaskInput;

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

    task = { ...task, ...props, assignees: assignedUsers };

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
}
