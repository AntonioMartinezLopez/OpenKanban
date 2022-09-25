import { CreateTasklogInput } from './create-tasklog.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTasklogInput extends PartialType(CreateTasklogInput) {
  @Field(() => Int)
  id: number;
}
