import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'
import { IsEmail } from 'class-validator'

@InputType()
export class LoginInput extends PasswordMixin(class {}){
  @Field()
  @IsEmail()
  email: string
}
