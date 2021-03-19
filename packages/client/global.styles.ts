import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "NotoSansHebrew", "NotoSans", Arial, sans-serif;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: normal;
    font-size: ${({ theme }) => theme.fonts.sizes.medium};
    margin: 0;
  }

  h1 {
    font-size: 48px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 28px;
  }

  h4 {
    font-size: 24px;
  }

  h5 {
    font-size: 21px;
  }

  h6 {
    font-size: 19px;
  }

  button, input {
    font-family: inherit;
  }
`
