import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { User } from 'src/user/entities/user.entity';
import { QueryTasksInput, QueryTasksResult } from './dto/query-tasks.input';
import { Label } from 'src/label/entities/label.entity';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.taskService.create(createTaskInput);
  }

  // @Query(() => [Task], { name: 'task' })
  // findAll() {
  //   return this.taskService.findAll();
  // }
  @Query(() => QueryTasksResult)
  loadTasksfromBoard(
    @Args('queryTasksInput') queryTasksInput: QueryTasksInput,
  ) {
    return this.taskService.findAllTaskFromBoardColumn(queryTasksInput);
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id') id: string) {
    return this.taskService.remove(id);
  }

  @ResolveField(() => [User])
  async assignees(@Parent() task: Task): Promise<User[]> {
    const { id } = task;
    return this.taskService.getAssignees(id);
  }

  @ResolveField(() => [Label])
  async labels(@Parent() task: Task): Promise<Label[]> {
    const { id } = task;
    return this.taskService.getLabels(id);
  }
}
