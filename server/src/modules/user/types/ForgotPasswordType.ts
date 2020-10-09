import { Field, InputType } from 'type-graphql'
import { IsEmail } from 'class-validator'


@InputType()
export default class ForgotPasswordType {
  @Field()
  @IsEmail()
  email: string
}
