import React from 'react'
import App from 'next/app'
import '../scss/index.scss'
import { MyContext } from '../interfaces/MyContext'
import withApollo from '../lib/withApollo'
import { NpTopProgressBar } from '../components/utils/NpProgressBar'


class MyApp extends App<MyContext> {
  render() {
    const {Component, pageProps, apolloClient} = this.props
    return (
        <>
          <NpTopProgressBar/>
          <Component apolloClient={ apolloClient } { ...pageProps }/>
        </>
    )
  }
}

export default withApollo(MyApp)
