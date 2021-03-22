import styled from 'styled-components'
import { themeColor } from '@/themes'

export const DropDownContainer = styled.div`
  animation: scaleForward .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;
  transform: translateX(-45%);
  background-color: ${ themeColor('white') };
  border: 1px solid ${ themeColor('dimGrey') };
  border-radius: 8px;
  overflow: hidden;
`
export const DropDownMenu = styled.div`
  margin: 1px;
`
