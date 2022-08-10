import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResult {
  @Field({ description: 'Example field (placeholder)' })
  access_token: string;
}
