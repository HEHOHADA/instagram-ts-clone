import React from 'react'
import App from 'next/app'
import '../scss/index.scss'
import { NpTopProgressBar } from '../components/utils/NpProgressBar'
import withReactRouter from '../lib/withReactRouter'


class MyApp extends App{
  render() {
    const {Component, pageProps} = this.props
    return (
        <>
          <NpTopProgressBar/>
          <Component { ...pageProps }/>
        </>
    )
  }
}

export default withReactRouter(MyApp)
