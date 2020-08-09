import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class RefreshResponseType {
  @Field()
  accessToken: string

  @Field()
  ok: boolean
}
