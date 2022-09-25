import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tasklog {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
