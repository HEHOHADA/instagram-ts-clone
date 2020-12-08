import { registerDecorator, ValidationOptions, ValidatorConstraintInterface, ValidatorConstraint } from 'class-validator'
import { User } from '../../../entity/User'

@ValidatorConstraint({async: true})
export class isUsernameUsed implements ValidatorConstraintInterface {
  validate(username: string): Promise<boolean> | boolean {
    return User.findOne({
      // @ts-ignore
      where: `"username" ILIKE '${ username.replace(/_/g, '\\_') }'`
    },{cache:true})
               .then(user => {
                 return !user
               })
  }
}

export function IsUsernameUsed(validationOptions: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: isUsernameUsed
    })
  }
}
