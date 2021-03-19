import { Field, InputType } from 'type-graphql'
import { MinLength } from 'class-validator'
import { PasswordMixin } from '../utils/PasswordMixin'

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
