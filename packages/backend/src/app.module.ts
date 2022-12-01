import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/entities/group.entity';
import { TaskModule } from './task/task.module';
import { BoardModule } from './board/board.module';
import { LabelModule } from './label/label.module';
import { MessageModule } from './message/message.module';
import { TasklogModule } from './tasklog/tasklog.module';
import { Board } from './board/entities/board.entity';
import { BoardcolumnModule } from './boardcolumn/boardcolumn.module';
import { Boardcolumn } from './boardcolumn/entities/boardcolumn.entity';
import { Task } from './task/entities/task.entity';
import { Label } from './label/entities/label.entity';
import { Message } from './message/entities/message.entity';
import {} from 'graphql-ws';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Group, Board, Boardcolumn, Task, Label, Message],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: true,
      playground: { settings: { 'request.credentials': 'include' } },
      context: ({ req, res }): { req: Request; res: Response } => {
        return { req, res };
      },
      cors: { origin: true, credentials: true },
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    AuthModule,
    UserModule,
    GroupsModule,
    TaskModule,
    BoardModule,
    LabelModule,
    MessageModule,
    TasklogModule,
    BoardcolumnModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'PUB_SUB',
      useFactory: () => {
        const options = {
          host: 'redis',
          port: 6379,
        };

        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
  ],
})
export class AppModule {}
