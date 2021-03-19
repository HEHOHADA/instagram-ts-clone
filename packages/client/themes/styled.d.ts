import 'styled-components'

import { Theme } from './index'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}

// to use styled-components css prop along with TS
declare module 'react' {
  interface Attributes {
    // NOTE: unlike the plain javascript version, it is not possible to get access
    // to the element's own attributes inside function interpolations.
    // Only theme will be accessible, and only with the DefaultTheme due to the global
    // nature of this declaration.
    // If you are writing this inline you already have access to all the attributes anyway,
    // no need for the extra indirection.
    /**
     * If present, this React element will be converted by
     * `babel-plugin-styled-components` into a styled component
     * with the given css as its styles.
     */
    css?: CSSProp | CSSObject
    jsx?: boolean
    global?: boolean
  }
}

// ONLY string literals and inline invocations of css`` are supported, anything else
// crashes the plugin
