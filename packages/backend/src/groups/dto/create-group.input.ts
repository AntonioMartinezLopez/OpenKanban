import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field({ description: 'The name of the group' })
  name: string;

  @Field({ description: 'Description of the group' })
  description: string;

  @Field(() => String, { description: 'First user and creator of the group' })
  userId: string;
}