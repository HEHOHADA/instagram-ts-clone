import React from 'react'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { isServer, NextPageContextWithApollo, WithApolloType } from '../withApollo'
import cookie from 'cookie'
import { getAccessToken, setAccessToken } from '../token'
import { NextPageContext } from 'next'

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null
type NextPageContextApp = NextPageContextWithApollo & AppContext

export const initOnContext = (ac: any, ctx: NextPageContextApp) => {
  const inAppContext = Boolean(ctx.ctx)

  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
          'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
      )
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
      ctx.apolloClient ||
      initApolloClient(ac, ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx)

  apolloClient.toJSON = () => null

  ctx.apolloClient = apolloClient
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient
  }

  return ctx
}


const initApolloClient = (apolloClient: any, initialState: NormalizedCacheObject, ctx: NextPageContextApp | undefined) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(apolloClient(ctx), initialState, ctx)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(
        apolloClient(ctx),
        initialState,
        ctx
    )
  }

  return globalApolloClient
}


export const createWithApollo = (ac: any) => {
  return ({ssr = false} = {}) => (PageComponent: any) => {
    const WithApollo = ({apolloClient, apolloState, serverAccessToken, ...pageProps}: WithApolloType) => {
      if (!isServer() && !getAccessToken()) {
        setAccessToken(serverAccessToken)
      }
      const client = apolloClient || initApolloClient(ac, apolloState, undefined)

      return (
          <ApolloProvider client={ client }>
            <PageComponent { ...pageProps } />
          </ApolloProvider>
      )
    }

    if (process.env.NODE_ENV !== 'production') {
      const displayName =
          PageComponent.displayName || PageComponent.name || 'Component'
      WithApollo.displayName = `withApollo(${ displayName })`
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async (ctx: NextPageContextApp & NextPageContext) => {
        const inAppContext = Boolean(ctx.ctx)
        const {apolloClient} = initOnContext(ac, ctx)

        let pageProps = {}
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx)
        } else if (inAppContext) {
          pageProps = await App.getInitialProps(ctx)
        }
        let serverAccessToken = ''
        if (isServer()) {

          const {AppTree} = ctx
          if (ctx.req?.headers.cookie) {
            const cookies = cookie.parse(ctx.req.headers.cookie)
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
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res?.finished) {
            return pageProps
          }

          // Only if dataFromTree is enabled
          if (ssr && AppTree) {
            try {
              const {getDataFromTree} = await import(
                  '@apollo/client/react/ssr'
                  )

              let props: any
              if (inAppContext) {
                props = {...pageProps, apolloClient}
              } else {
                props = {pageProps: {...pageProps, apolloClient}}
              }

              await getDataFromTree(<AppTree { ...props } />)
            } catch (error) {
              console.error('Error while running `getDataFromTree`', error)
            }
            Head.rewind()
          }
        }

        return {
          ...pageProps,
          serverAccessToken,
          apolloState: apolloClient!.cache.extract(),
          apolloClient: ctx.apolloClient
        }
      }
    }

    return WithApollo
  }
}

function createApolloClient(apolloClient: any, initialState: NormalizedCacheObject, ctx: NextPageContextApp | undefined) {
  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  apolloClient.ssrMode = Boolean(ctx)
  apolloClient.cache.restore(initialState)

  return apolloClient
}
