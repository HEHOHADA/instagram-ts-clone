import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'
import UserType from '../types/UserType'
import { IsUsernameUsed } from './isUsernameUsed'

@InputType()
export class RegisterInput extends PasswordMixin(UserType) {
  @Field()
  fullName: string

  @Field()
  @IsUsernameUsed({ message: 'username already used' })
  username: string
}
