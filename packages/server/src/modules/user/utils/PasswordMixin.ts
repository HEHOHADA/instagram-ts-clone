import { ClassType, Field, InputType, ObjectType } from 'type-graphql'
import { MinLength } from 'class-validator'


export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @ObjectType({isAbstract: true})
  @InputType({isAbstract: true})
  class PasswordTrait extends BaseClass {
    @MinLength(5)
    @Field()
    password: string
  }

  return PasswordTrait
}
