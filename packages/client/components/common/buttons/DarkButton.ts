import styled from 'styled-components'
import { setGreyDisabledStyles } from '@/components/form/Button/ButtonStyled'
import { rgba, themeColor } from '@/themes'
import { Button } from '@/components/form/Button/Button'

export const DarkButton = styled(Button).attrs(({ color, focusShadow = true }) => ({
  color: color || 'navyDark',
  focusShadow
}))`
  &:hover {
    background: ${ rgba('navyLight', 0.75) };
  }

  &:active {
    background: ${ themeColor('black') };
  }

  && {
    background: ${ ({ loading }) => loading && themeColor('navyLight') };
  }

  ${ ({ loading }) => !loading && setGreyDisabledStyles }
`
