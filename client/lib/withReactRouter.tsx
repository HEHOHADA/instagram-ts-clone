import React from 'react'
import { StaticRouter } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const isServer = typeof window === 'undefined'

export default (App: any) => {
  return class AppWithReactRouter extends React.Component<any, any> {
    render() {
      if (isServer) {
        const {StaticRouter} = require('react-router')
        return (
            <StaticRouter
                location={ this.props.router.asPath }
            >
              <App { ...this.props } />
            </StaticRouter>
        )
      } else {
        return (
            <BrowserRouter>
              <App { ...this.props } />
            </BrowserRouter>
        )
      }
    }
  }
};
