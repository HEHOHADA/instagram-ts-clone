import React from 'react'
import Head from 'next/head'

import initApollo from './initApollo'
import { isBrowser } from './isBrowser'

const withApollo = (PageComponent: any, {ssr = true} = {}) => {

  const WithApollo = ({apolloClient, apolloState, ...pageProps}: any) => {
    const client = apolloClient || initApollo(apolloState)
    return <PageComponent { ...pageProps } apolloClient={ client }/>
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
        Component,
        ctx: {res}
      } = ctx

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApollo({}))

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
        if (ssr) {
          try {
            // Run all GraphQL queries
            const {getDataFromTree} = await import('@apollo/react-ssr')
            // console.log('react apollo client',apolloClient)
             await getDataFromTree(
                <Component
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
        apolloState
      }
    }
  }
  return WithApollo
}

export default withApollo
