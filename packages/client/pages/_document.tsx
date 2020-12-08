import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
        <Html>
          <Head>
            <meta charSet="utf-8"/>
            <link rel="shortcut icon" href="/static/favicon.ico"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
          </Head>
          <body>
          <Main/>
          <NextScript/>
          </body>
        </Html>
    )
  }
}

