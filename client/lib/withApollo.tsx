import React from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import initApollo from './initApollo'
import { getAccessToken, setAccessToken } from './token'
import { NextPageContext } from 'next'
import App, { AppContext } from 'next/app'

export interface NextPageContextWithApollo extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject> | null
  apolloState: NormalizedCacheObject
  ctx: NextPageContextApp
}

type NextPageContextApp = NextPageContextWithApollo & AppContext


export const isServer = () => typeof window === 'undefined'

export type WithApolloType = {
  apolloClient: ApolloClient<NormalizedCacheObject>
  apolloState: NormalizedCacheObject
  serverAccessToken: string
}
export const initOnContext = (ctx: NextPageContextApp, serverAccessToken: string): NextPageContextApp => {
  const inAppContext = Boolean(ctx.ctx)
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
          'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.Read more: https://err.sh/next.js/opt-out-auto-static-optimization',
      )
    }
  }

  const apolloClient =
      ctx.apolloClient || initApollo(ctx.apolloState || {}, serverAccessToken)

  ctx.apolloClient = apolloClient
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient
  }
  return ctx
}


function withApollo(PageComponent: any, {ssr = true}: { ssr?: boolean } = {}) {

  const WithApollo = ({apolloClient, apolloState, serverAccessToken, ...pageProps}: WithApolloType) => {

    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken)
    }
    const client = apolloClient || initApollo(apolloState)
    return (
        <ApolloProvider client={ client }>
          <PageComponent { ...pageProps } />
        </ApolloProvider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
        PageComponent.displayName || PageComponent.name || 'Component'

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${ displayName })`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: NextPageContextApp) => {
      // console.log(ctx)
      const {
        AppTree,
        ctx: {res, req}
      } = ctx
      let serverAccessToken = ''

      if (isServer() && req?.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie)
        if (cookies.jid) {

          const response = await fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include',
            headers: {
              cookie: 'jid=' + cookies.jid
            }
          })
          const data = await response.json()
          serverAccessToken = data.accessToken
        }

      }
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const inAppContext = Boolean(ctx.ctx)
      const {apolloClient} = initOnContext(ctx, serverAccessToken)

      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx)
      }

      // Only on the server
      if (isServer()) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res?.finished) {
          return pageProps
        }
        if (ssr && AppTree) {
          try {
            // Run all GraphQL queries
            const {getDataFromTree} = await import('@apollo/react-ssr')

            let props: any
            if (inAppContext) {
              props = {...pageProps, apolloClient}
            } else {
              props = {pageProps: {...pageProps, apolloClient}}
            }
            await getDataFromTree(
                <AppTree
                    { ...props }
                />
            )
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient!.cache.extract()

      return {
        ...pageProps,
        apolloState,
        serverAccessToken
      }
    }
  }
  return WithApollo
}

export default withApollo
