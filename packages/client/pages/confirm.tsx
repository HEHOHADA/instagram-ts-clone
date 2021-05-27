import React from 'react'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import { MainLayout } from '@/components/layouts'
import { MyContext } from '@/interfaces/MyContext'
import {
  IConfirmUserMutation,
  IConfirmUserMutationVariables
} from '@instagram/common'
import { confirmUserMutation } from '@instagram/common/dist/graphql/mutation'

const Confirm = () => {
  return (
    <MainLayout title='Something went wrong'>
      <h1>Something went wrong</h1>
    </MainLayout>
  )
}

Confirm.getInitialProps = async ({ query: { token }, apolloClient, ...ctx }: MyContext) => {
  if (!token) {
    return {}
  }
  await apolloClient.mutate<IConfirmUserMutation,
    IConfirmUserMutationVariables>({
    mutation: confirmUserMutation,
    variables: {
      token: token as string
    }
  })
  Redirect(ctx, '/accounts/login')
  return {}
}


export default withApollo()(Confirm)
