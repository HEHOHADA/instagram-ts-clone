import { ErrorMessageType } from './ErrorMessageType'
import { User } from '../entity/User'
import { createUnionType, Field, ObjectType } from 'type-graphql'

export type MutationReturnType = User | ErrorMessageType

@ObjectType()
class ErrorLoginType {
  @Field()
  path?: string

  @Field()
  message?: string
}


export const UserLoginMutationError = createUnionType({
  name: 'UserLoginError',
  types: () => [User, ErrorLoginType] as const,
})


