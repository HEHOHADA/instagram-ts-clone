import React from 'react'
import { MyContext } from '../interfaces/MyContext'
import MainLayout from '../components/MainLayout'
import { ConfirmUserMutation, ConfirmUserMutationVariables } from '../geterated/apollo'
import redirect from '../lib/redirect'
import { confirmUserMutation } from '../graphql/user/mutation/confirmUser'

const Confirm = () => {
  return (
      <MainLayout title="Something went wrong">
        <h1>Something went wrong</h1>
      </MainLayout>
  )
}

Confirm.getInitialProps = async ({query: {token}, apolloClient, ...ctx}: MyContext) => {
  if (!token) {
    return {}
  }
  await apolloClient.mutate<ConfirmUserMutation,
      ConfirmUserMutationVariables>({
    mutation: confirmUserMutation,
    variables: {
      token: token as string
    }
  })
  redirect(ctx, '/accounts/login')
  return {}
}

export default Confirm
