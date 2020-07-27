import { Field, InputType } from 'type-graphql'

@InputType()
export class GetFollowType {
  @Field({nullable: true})
  userId?: string
}
