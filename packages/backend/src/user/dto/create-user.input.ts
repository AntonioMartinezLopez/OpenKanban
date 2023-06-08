import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Field for username of the new user' })
  username: string;

  @Field({ description: 'Field for first name of the new user' })
  firstName: string;

  @Field({ description: 'Field for last name of the new user' })
  lastName: string;

  @Field({ description: 'Field for the email address of the new suer' })
  email: string;

  @Field({ description: 'Field for the password of the new user' })
  password: string;
}
