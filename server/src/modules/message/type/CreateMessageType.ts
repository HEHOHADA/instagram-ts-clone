import { Length } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateMessageInput {
  @Field()
  @Length(1, 200)
  text: string
}
