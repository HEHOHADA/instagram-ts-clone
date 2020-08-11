import { GraphQLError } from 'graphql'

export type ValidationError = {
  target?: Object
  property: string
  value?: any
  constraints?: {
    [type: string]: string
  }
  children: ValidationError[]
  contexts?: {
    [type: string]: any
  }
}

export const formatValidationErrors = ({extensions, message}: GraphQLError, defaultPropery: string):
    { [key: string]: string } => {
  const errors: { [key: string]: string } = {}
  extensions?.exception.validationErrors.forEach((object: ValidationError) => {
    if (object.constraints) {
      errors[object.property] = Object.values(object.constraints)[0]
    } else {
      errors[object.property] = message
    }
  })
  if (!Object.keys(errors).length) {
    errors[defaultPropery] = message
  }

  return errors
}
