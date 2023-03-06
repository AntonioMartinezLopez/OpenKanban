import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardcolumnModule } from 'src/boardcolumn/boardcolumn.module';
import { UserModule } from 'src/user/user.module';
import { LabelModule } from 'src/label/label.module';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Group]),
    BoardcolumnModule,
    UserModule,
    LabelModule,
  ],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
