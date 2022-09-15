import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

export class UpdateUserInputAuth extends PartialType(CreateUserInput) {
  @Field()
  userId: string;

  @Field(() => [String])
  refreshToken: string[];
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  userId: string;

  @Field({ description: 'Field for name of the new user' })
  username: string;

  @Field({ description: 'Field for the email address of the new user' })
  email: string;

  @Field({ description: 'Field for the password of the new user' })
  password: string;
}
