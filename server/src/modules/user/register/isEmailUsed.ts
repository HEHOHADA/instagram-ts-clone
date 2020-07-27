import { registerDecorator, ValidationOptions, ValidatorConstraintInterface } from 'class-validator'
import { User } from '../../../entity/User'

export class isEmailUsed implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> | boolean {
    return User.findOne({where: {email}})
               .then(user => !user)
  }
}

export function IsEmailUsed(validationOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: isEmailUsed
    })
  }
}
