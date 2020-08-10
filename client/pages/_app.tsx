import React from 'react'
import App from 'next/app'
import '../scss/index.scss'
import withApollo from '../lib/withApollo'
import { MyContext } from '../interfaces/MyContext'
import { ApolloProvider } from '@apollo/client'

class MyApp extends App<MyContext> {
  render() {
    const {Component, pageProps, apolloClient} = this.props
    return (
        <ApolloProvider client={ apolloClient }>
          <Component apolloClient={ apolloClient } { ...pageProps }/>
        </ApolloProvider>
    )
  }
}

export default withApollo(MyApp)
