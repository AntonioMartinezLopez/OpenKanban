import { Module, forwardRef } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsResolver } from './groups.resolver';
import { Group } from './entities/group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { BoardModule } from 'src/board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => UserModule),
    BoardModule,
  ],
  providers: [GroupsResolver, GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
