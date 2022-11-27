import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field({ description: 'The content of the message' })
  text: string;

  @Field({ description: 'The creator of the message ' })
  creatorId: string;

  @Field({ description: 'The id of the group' })
  groupId: string;
}
