import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/entities/board.entity';
import { BoardcolumnModule } from 'src/boardcolumn/boardcolumn.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board]), BoardcolumnModule],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
