import React from 'react'
import App from 'next/app'
import '../scss/index.scss'
import withApollo from '../lib/withApollo'
import { ApolloProvider } from '@apollo/react-hooks'
import { MyContext } from '../interfaces/MyContext'

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
