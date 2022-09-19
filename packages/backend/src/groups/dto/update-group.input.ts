import { CreateGroupInput } from './create-group.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupInput extends PartialType(CreateGroupInput) {
  @Field({ description: 'The id of the group' })
  id: string;

  @Field({ description: 'The name of the group' })
  name: string;

  @Field({ description: 'Description of the group' })
  description: string;
}
