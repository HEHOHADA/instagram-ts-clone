import styled from 'styled-components'
import { media } from '@/helpers'

export const Box = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${ ({ column }) => column ? 'column' : 'row' };
  position: relative;
`

export const BoxCenter = styled(Box)`
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;

  ${ media.kilo } {
    max-width: 540px
  }
  
  ${ media.mega } {
    max-width: 720px
  }

  ${ media.giga } {
    max-width: 960px
  }
  
  ${media.tera}{
    max-width: 1140px
  }
`
