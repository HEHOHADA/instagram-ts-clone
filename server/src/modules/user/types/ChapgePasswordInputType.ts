import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'

@InputType()
export class ChangePasswordInput extends PasswordMixin(class {}) {
  @Field()
  token: string
}
