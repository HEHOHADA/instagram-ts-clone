import React from 'react'
import GenericForm, { IGenericFormBaseProps } from '@/components/form/GeneticForm'
import { LoginDocument, LoginMutationResult, LoginMutationVariables } from '@/geterated/apollo'
import withApollo from '@/lib/withApollo'

const Index = () => {
  return (
    <GenericForm<LoginType, LoginMutationResult>
      {...loginForm}
        transformValues={(values) => {
          return {
            data: values,
          }
        }}
      />
    )

}

export default withApollo()(Index)

type LoginType = LoginMutationVariables['data']
export const loginForm: IGenericFormBaseProps<LoginType,LoginMutationResult> = {
  mutationSchema: LoginDocument,
  submitBtnLabel: 'Login',
  loadingMessage: 'Logging In',
  fields: {
    email: {
      componentProps: {
        type: 'email',
        placeholder: 'someone@example.com',
      },
      decoratorOption: {
        rules: [
          {
            required: true,
            message: 'Please enter your email address!',
          },
          {
            type: 'email',
            message: 'Value must be an email address',
          },
        ],
      },
    },
    password: {
      componentProps: {
        type: 'password',
        placeholder: 'password',
      },
      decoratorOption: {
        rules: [
          {
            required: true,
            message: 'Please enter your password!',
          },
        ],
      },
    },
  },
  fieldOrder: ['email', 'password'],
}
