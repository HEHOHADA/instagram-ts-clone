import { Field, InputType } from 'type-graphql'

@InputType()
export class CreateCommentType {
  @Field()
  photoId: string

  @Field()
  commentText: string
}
