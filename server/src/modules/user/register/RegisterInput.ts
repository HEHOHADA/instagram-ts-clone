import { Field, InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'
import UserType from '../types/UserType'

@InputType()
export class RegisterInput extends PasswordMixin(UserType){
  @Field()
  fullName: string
}
