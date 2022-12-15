import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBoardcolumnInput {
  @Field({ description: 'The name of the Column' })
  name: string;

  @Field(() => Int, { description: 'Maximum weight of tasks', nullable: true })
  maxWeight: number;

  @Field({ description: 'Board Id' })
  boardId: string;
}
