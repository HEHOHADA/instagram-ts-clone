import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { User } from '../../../entity/User'

@ValidatorConstraint({async: true})
export class isEmailUsed implements ValidatorConstraintInterface {
  validate(email: string): Promise<boolean> | boolean {
    return User.findOne({where: {email}})
               .then(user => {
                 return !user
               })
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
