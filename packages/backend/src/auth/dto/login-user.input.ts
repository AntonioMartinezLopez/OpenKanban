import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field({ description: 'Example field (placeholder)' })
  username: string;

  @Field({ description: 'Example field (placeholder)' })
  password: string;
}
