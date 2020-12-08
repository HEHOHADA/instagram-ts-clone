import { Field, InputType } from 'type-graphql'

@InputType()
export class GetFollowType {
  @Field()
  username: string
}
