import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLabelInput {
  @Field({ description: 'The name of the label' })
  name: string;

  @Field({ description: 'color of the label' })
  color: string;

  @Field({ description: 'id of the corresponding group' })
  groupId: string;
}
