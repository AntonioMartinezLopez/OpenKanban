import { CreateBoardcolumnInput } from './create-boardcolumn.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardcolumnInput extends PartialType(
  CreateBoardcolumnInput,
) {
  @Field({ description: 'BoardColumn Id' })
  boardColumnId: string;

  @Field({ description: 'The name of the Column' })
  name: string;

  @Field(() => Int, { description: 'Maximum weight of tasks', nullable: true })
  maxWeight: number;
}
