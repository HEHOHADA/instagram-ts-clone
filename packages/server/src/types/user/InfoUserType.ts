import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class InfoUserType {
  @Field()
  followerCount: number

  @Field()
  followingCount: number
}
