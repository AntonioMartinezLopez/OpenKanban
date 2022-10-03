import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field({ description: 'The name of the board' })
  name: string;

  @Field({ description: 'The desciription of the user' })
  description: string;

  @Field({ description: 'Group Id' })
  groupId: string;
}
