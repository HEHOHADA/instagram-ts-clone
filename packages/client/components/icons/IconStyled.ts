import styled from 'styled-components'
import { ColorName, themeColor } from '@/themes'
import { iconSizeMap, IconSizes } from '@/components/icons/Icon'

export const IconWrapper = styled.a <{ size: IconSizes | number, color?: ColorName | string }>`
  font-size: ${ ({ size }) => typeof size !== 'number' ? iconSizeMap[size] : `${ size }px` };
  
  color: ${ ({ color }) => color && (
    // @ts-ignore
    themeColor(color) || color) }
`
