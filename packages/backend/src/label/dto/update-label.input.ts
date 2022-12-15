import { CreateLabelInput } from './create-label.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLabelInput extends PartialType(CreateLabelInput) {
  @Field(() => String, { description: 'id of the label' })
  labelId: string;

  @Field({ description: 'The name of the label' })
  name: string;

  @Field({ description: 'color of the label' })
  color: string;
}
