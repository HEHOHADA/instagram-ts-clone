import { NextPageContext } from 'next'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export interface MyContext extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>
}
