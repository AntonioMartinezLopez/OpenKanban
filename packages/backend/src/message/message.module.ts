import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), GroupsModule, UserModule],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
