import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '@helpers/user/PasswordMixin'
import UserType from '@type/user/UserType'
import { IsUsernameUsed } from '@helpers/user/auth/isUsernameUsed'

@InputType()
export class RegisterInput extends PasswordMixin(UserType) {
  @Field()
  fullName: string

  @Field()
  @IsUsernameUsed({ message: 'username already used' })
  username: string
}
