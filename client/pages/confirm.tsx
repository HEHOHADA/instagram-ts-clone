import React from 'react'
import MainLayout from '../components/MainLayout'
import { MyContext } from '../interfaces/MyContext'
import { ConfirmUserMutation, ConfirmUserMutationVariables } from '../geterated/apollo'
import { confirmUserMutation } from '../graphql/user/mutation/confirmUser'
import Redirect from '../lib/redirect'
import withApollo from '../lib/withApollo'

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
  Redirect(ctx, '/accounts/login')
  return {}
}


export default withApollo()(Confirm)
