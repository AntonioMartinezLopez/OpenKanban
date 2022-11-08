import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Task } from 'src/task/entities/task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Board, Group, Task])],
  providers: [BoardResolver, BoardService],
  exports: [BoardService],
})
export class BoardModule {}
