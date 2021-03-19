import { Field, InputType } from 'type-graphql'

@InputType()
export class DeleteCommentType {
  @Field()
  id: string
}
