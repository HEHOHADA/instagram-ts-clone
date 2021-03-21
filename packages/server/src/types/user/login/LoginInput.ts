import { Field, InputType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { PasswordMixin } from '../utils/PasswordMixin'

@InputType()
export class LoginInput extends PasswordMixin(class {}) {
  @Field()
  @IsEmail()
  email: string
}
