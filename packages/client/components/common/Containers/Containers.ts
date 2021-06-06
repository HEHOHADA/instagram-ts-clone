import styled from 'styled-components'

export const Box = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${ ({ column }) => column ? 'column' : 'row' };
  position: relative;
`

export const BoxCenter = styled(Box)`
  justify-content: center;
  align-items: center;
`
