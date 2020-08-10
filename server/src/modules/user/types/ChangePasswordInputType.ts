import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'
import { MinLength } from 'class-validator'

@InputType()
export class ChangeForgotPassword extends PasswordMixin(class {}) {
  @Field()
  token: string
}



@InputType()
export class ChangePassword extends PasswordMixin(class {}) {
  @Field()
  @MinLength(5)
  oldPassword: string
}
