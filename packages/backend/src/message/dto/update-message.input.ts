import { CreateMessageInput } from './create-message.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {
  @Field({ description: 'The id of the updating message' })
  messageId: string;

  @Field({ description: 'the text of the message' })
  text: string;
}
