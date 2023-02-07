import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateGroupInput {
  @Field({ description: 'The id of the group' })
  id: string;

  @Field({ description: 'The name of the group', nullable: true })
  name: string;

  @Field({ description: 'Description of the group', nullable: true })
  description: string;
}
