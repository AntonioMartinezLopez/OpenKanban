import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'UserId' })
  userId: number;

  @Field({ description: 'The name of the user' })
  username: string;

  @Field({ description: 'The hashed password of the user' })
  password: string;
}
