import { Field, ObjectType } from 'type-graphql'
import { User } from '@entity/User'

@ObjectType()
export class LoginResponseType {
  @Field()
  accessToken: string

  @Field(() => User)
  user: User
}
