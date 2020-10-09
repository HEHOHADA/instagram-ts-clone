import { Field, InputType, ObjectType } from 'type-graphql'
import { IsEmail } from 'class-validator'
import { IsEmailUsed } from '../register/isEmailUsed'

@ObjectType({isAbstract:true})
@InputType({isAbstract:true})
export default class UserType {
  @Field()
  @IsEmail()
  @IsEmailUsed({message: 'email already used'})
  email: string
}
