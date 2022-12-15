import { Module } from '@nestjs/common';
import { TasklogService } from './tasklog.service';
import { TasklogResolver } from './tasklog.resolver';

@Module({
  providers: [TasklogResolver, TasklogService]
})
export class TasklogModule {}
