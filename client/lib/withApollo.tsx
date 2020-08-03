import React from 'react'
import Head from 'next/head'
import cookie from 'cookie'
import initApollo from './initApollo'
import { isBrowser } from './isBrowser'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { getAccessToken, setAccessToken } from './token'

export const isServer = () => typeof window === 'undefined'

const withApollo = (PageComponent: any, {ssr = true} = {}) => {

  const WithApollo = ({apolloClient, apolloState, serverAccessToken, ...pageProps}:
                          {
                            apolloClient: ApolloClient<NormalizedCacheObject>, serverAccessToken: string,
                            apolloState: NormalizedCacheObject
                          }) => {

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
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: {res, req}
      } = ctx


      let serverAccessToken = ''

      if (isServer()&&req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie)
        console.log(cookies)
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
      const apolloClient = (ctx.ctx.apolloClient = initApollo({}, serverAccessToken))

      const pageProps = PageComponent.getInitialProps
          ? await PageComponent.getInitialProps(ctx)
          : {}

      // Only on the server
      if (!isBrowser) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return pageProps
        }
        if (ssr && AppTree) {
          try {
            // Run all GraphQL queries
            const {getDataFromTree} = await import('@apollo/react-ssr')
            // console.log('react apollo client',apolloClient)
            await getDataFromTree(
                <AppTree
                    pageProps={ {...pageProps, apolloClient} }
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
      const apolloState = apolloClient.cache.extract()

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
