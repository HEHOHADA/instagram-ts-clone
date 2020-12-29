import { MutationHookOptions, useMutation } from '@apollo/client/react'
import { LoginDocument, LoginMutation, LoginMutationVariables } from '@instagram/common'

export function useLoginMutation(baseOptions?: MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions)
}
