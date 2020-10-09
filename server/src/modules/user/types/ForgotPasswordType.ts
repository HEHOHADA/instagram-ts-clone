import { IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export default class ForgotPasswordType {
  @Field()
  @IsEmail()
  email: string
}
