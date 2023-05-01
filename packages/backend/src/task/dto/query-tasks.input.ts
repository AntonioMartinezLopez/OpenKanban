import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@InputType()
export class QueryTasksInput {
  @Field()
  groupId: string;

  @Field({ description: 'The name of the task' })
  boardColumnName: string;

  @Field(() => Int, { description: 'Description of the task' })
  page: number;

  @Field(() => Int, { description: 'Description of the task' })
  pageSize: number;
}

@ObjectType()
export class QueryTasksResult {
  @Field(() => [Task])
  tasks: Task[];

  @Field()
  hasMore: boolean;
}
