import { CreateTaskInput } from './create-task.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTaskInput extends PartialType(CreateTaskInput) {
  @Field({ description: 'Task Id' })
  id: string;

  @Field({ description: 'The name of the task' })
  name: string;

  @Field({ description: 'Description of the task' })
  description: string;

  @Field(() => Int, { description: 'Calculated weight of a task' })
  weight: number;

  @Field({ description: 'BoardColumn Id', nullable: true })
  boardColumnId: string;

  @Field(() => [String], { description: 'Board Id' })
  assignees: string[];

  @Field(() => [String], { description: 'Labels' })
  labels: string[];
}
