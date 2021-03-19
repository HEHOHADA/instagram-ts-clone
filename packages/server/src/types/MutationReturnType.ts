import { createUnionType, Field, ObjectType } from 'type-graphql'

import { User } from '@entity/User'
import { ErrorMessageType } from './ErrorMessageType'

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
  types: () => [User, ErrorLoginType] as const
})
