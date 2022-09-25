import { Injectable } from '@nestjs/common';
import { CreateTasklogInput } from './dto/create-tasklog.input';
import { UpdateTasklogInput } from './dto/update-tasklog.input';

@Injectable()
export class TasklogService {
  create(createTasklogInput: CreateTasklogInput) {
    return 'This action adds a new tasklog';
  }

  findAll() {
    return `This action returns all tasklog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasklog`;
  }

  update(id: number, updateTasklogInput: UpdateTasklogInput) {
    return `This action updates a #${id} tasklog`;
  }

  remove(id: number) {
    return `This action removes a #${id} tasklog`;
  }
}
