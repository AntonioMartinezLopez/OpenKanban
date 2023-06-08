import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardcolumnModule } from 'src/boardcolumn/boardcolumn.module';
import { UserModule } from 'src/user/user.module';
import { LabelModule } from 'src/label/label.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    GroupsModule,
    BoardcolumnModule,
    UserModule,
    LabelModule,
  ],
  providers: [TaskResolver, TaskService],
})
export class TaskModule {}
