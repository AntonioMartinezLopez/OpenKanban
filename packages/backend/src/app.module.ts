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
import { Context } from 'graphql-ws';
import { PubSubModule } from './pubSub/pubSub.module';
import { AuthService } from './auth/auth.service';

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
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      //import AuthModule for JWT headers at graphql subscriptions
      imports: [AuthModule],
      //inject Auth Service
      inject: [AuthService],
      driver: ApolloDriver,
      useFactory: async (authService: AuthService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        debug: true,
        playground: { settings: { 'request.credentials': 'include' } },
        context: ({
          req,
          res,
          connection,
          extra,
        }): {
          req: Request;
          res: Response;
          connection: any;
          extra: any;
        } => {
          return { req, res, connection, extra };
        },
        cors: { origin: true, credentials: true },
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: Context<any>) => {
              const { connectionParams, extra } = context;
              // user validation will remain the same as in the example above
              // when using with graphql-ws, additional context value should be stored in the extra field

              // convert header keys to lowercase
              const connectionParamsLowerKeys = Object.fromEntries(
                Object.entries(connectionParams).map(([k, v]) => [
                  k.toLowerCase(),
                  v,
                ]),
              );
              // get authToken from authorization header
              let authToken: string | false = false;

              const val = connectionParamsLowerKeys['authorization'];
              if (val != null && typeof val === 'string') {
                authToken = val.split(' ')[1];
              }
              if (authToken) {
                // verify authToken/getJwtPayLoad
                const jwtPayload = authService.validateToken(authToken);

                (extra as any).user = {
                  currentUser: jwtPayload.username,
                  jwtPayload,
                  headers: connectionParamsLowerKeys,
                };
              }
            },
          },

          'subscriptions-transport-ws': {
            onConnect: (connectionParams) => {
              // convert header keys to lowercase
              const connectionParamsLowerKeys = Object.fromEntries(
                Object.entries(connectionParams).map(([k, v]) => [
                  k.toLowerCase(),
                  v,
                ]),
              );
              // get authToken from authorization header
              let authToken: string | false = false;

              const val = connectionParamsLowerKeys['authorization'];
              if (val != null && typeof val === 'string') {
                authToken = val.split(' ')[1];
              }
              if (authToken) {
                // verify authToken/getJwtPayLoad
                const jwtPayload = authService.validateToken(authToken);

                // the user/jwtPayload object found will be available as context.currentUser/jwtPayload in GraphQL resolvers
                return {
                  currentUser: jwtPayload.username,
                  jwtPayload,
                  headers: connectionParamsLowerKeys,
                };
              }
            },
          },
        },
      }),
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
    PubSubModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'PUB_SUB',
    //   useFactory: () => {
    //     const options = {
    //       host: 'redis',
    //       port: 6379,
    //     };

    //     return new RedisPubSub({
    //       publisher: new Redis(options),
    //       subscriber: new Redis(options),
    //     });
    //   },
    // },
  ],
})
export class AppModule {}
