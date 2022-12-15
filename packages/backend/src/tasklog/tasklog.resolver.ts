import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasklogService } from './tasklog.service';
import { Tasklog } from './entities/tasklog.entity';
import { CreateTasklogInput } from './dto/create-tasklog.input';
import { UpdateTasklogInput } from './dto/update-tasklog.input';

@Resolver(() => Tasklog)
export class TasklogResolver {
  constructor(private readonly tasklogService: TasklogService) {}

  @Mutation(() => Tasklog)
  createTasklog(@Args('createTasklogInput') createTasklogInput: CreateTasklogInput) {
    return this.tasklogService.create(createTasklogInput);
  }

  @Query(() => [Tasklog], { name: 'tasklog' })
  findAll() {
    return this.tasklogService.findAll();
  }

  @Query(() => Tasklog, { name: 'tasklog' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasklogService.findOne(id);
  }

  @Mutation(() => Tasklog)
  updateTasklog(@Args('updateTasklogInput') updateTasklogInput: UpdateTasklogInput) {
    return this.tasklogService.update(updateTasklogInput.id, updateTasklogInput);
  }

  @Mutation(() => Tasklog)
  removeTasklog(@Args('id', { type: () => Int }) id: number) {
    return this.tasklogService.remove(id);
  }
}
