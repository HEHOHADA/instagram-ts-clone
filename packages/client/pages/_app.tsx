import React from 'react'
import App from 'next/app'

import 'scss/index.scss'

import { withReactRouter } from '@/lib/withReactRouter'
import { NpTopProgressBar } from '@/components/utils/NpProgressBar'
import { GlobalStyles } from '@/global.styles'
import { AppThemeProvider } from '@/themes'


class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AppThemeProvider>
        <NpTopProgressBar />
        <GlobalStyles />
        <Component { ...pageProps } />
      </AppThemeProvider>
    )
  }
}

export default withReactRouter(MyApp)
