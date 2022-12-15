import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTasklogInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
