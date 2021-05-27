import React, { FC, useMemo } from 'react'
import { ThemeProvider } from 'styled-components'
import * as defaultTheme from './default'

export const AppThemeProvider: FC = (props) => {
  const theme = useMemo(() => ({
    ...defaultTheme
  }), [])

  return <ThemeProvider theme={ theme }>{ props.children }</ThemeProvider>
}
