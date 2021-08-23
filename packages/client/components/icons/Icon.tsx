import React, { FC } from 'react'
import { StyledComponent } from 'styled-components'
import { ColorName, SizeMap } from '@/themes'
import { IconWrapper } from '@/components/icons/IconStyled'

export type IconProps = {
  iconName: string
  wrapper?: StyledComponent<'a', any>
  onClick?: () => void
  size?: IconSizes | number
  color?: ColorName | string
}

export const iconSizeMap: SizeMap<number> = {
  small: 14,
  medium: 20,
  big: 26
} as const

export type IconSizes = keyof typeof iconSizeMap

export const Icon: FC<IconProps> = (props) => {
  const { iconName, size = 'medium', wrapper: Wrapper = IconWrapper, onClick, color } = props

  return (
    <Wrapper onClick={ onClick } className='material-icons' color={ color } size={ size }>
      { iconName }
    </Wrapper>
  )

}
