import styled from 'styled-components'
import { themeColor, themeFontSize } from '@/themes'
import { media } from '@/helpers'

export const LinkStyled = styled.a<{ underlined?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: ${ themeFontSize('regular') };
  color: ${ themeColor('link') };
  cursor: pointer;
  text-decoration: ${ ({ underlined }) => (underlined ? 'underline' : 'none') };

  &:hover {
    text-decoration: ${ ({ underlined }) => (underlined ? 'none' : 'underline') };
  }

  &:visited {
    color: ${ themeColor('link') };
  }

  ${ media.tera } {
    font-size: ${ themeFontSize('medium') };
  }
`
