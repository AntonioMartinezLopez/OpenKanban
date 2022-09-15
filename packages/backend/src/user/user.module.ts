import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GroupsModule } from 'src/groups/groups.module';
@Module({
  imports: [TypeOrmModule.forFeature([User]), GroupsModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
