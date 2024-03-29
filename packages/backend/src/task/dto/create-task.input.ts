import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field({ description: 'The name of the task' })
  name: string;

  @Field({ description: 'Description of the task' })
  description: string;

  @Field(() => Int, {
    description: 'Calculated weight of a task',
    nullable: true,
  })
  maxWeight: number;

  @Field({ description: 'Group Id' })
  groupId: string;

  @Field(() => [String], { description: 'assignees' })
  assignees: string[];

  @Field(() => [String], { description: 'labels' })
  labels: string[];
}
