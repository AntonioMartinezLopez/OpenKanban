import { Global, Module } from '@nestjs/common';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Global()
@Module({
  providers: [
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
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
