import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Field for name of the new user' })
  username: string;

  @Field({ description: 'Field for the email address of the new suer' })
  email: string;

  @Field({ description: 'Field for the password of the new user' })
  password: string;
}
