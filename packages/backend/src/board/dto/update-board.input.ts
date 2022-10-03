import { CreateBoardInput } from './create-board.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
  @Field({ description: 'Id of the board' })
  id: string;

  @Field({ description: 'The name of the board' })
  name: string;

  @Field({ description: 'The desciription of the user' })
  description: string;
}
