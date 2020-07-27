import { InputType } from 'type-graphql'
import { PasswordMixin } from '../utils/PasswordMixin'
import UserType from '../types/UserType'

@InputType()
export class LoginInput extends PasswordMixin(UserType){

}
