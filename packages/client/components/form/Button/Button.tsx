import React, { FC, ReactElement, useRef } from 'react'
import { AnyStyledComponent } from 'styled-components'

import {
  ButtonContentWrapper,
  ButtonSizeMap,
  ButtonStyled,
  ButtonWidthMap,
  IconWrapper
} from './ButtonStyled'
import { ColorName } from '@/themes'

export type ButtonSize = keyof ButtonSizeMap;
export type ButtonWidth = keyof ButtonWidthMap | string;
export type ButtonColor = ColorName;
export type ButtonAlign =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: ButtonSize;
  width: ButtonWidth;
  color: ButtonColor;
  textColor: ButtonColor;
  align: ButtonAlign;
  mirroredIcon?: boolean;
  loading?: boolean;
  forwardedAs?: any; // https://github.com/styled-components/styled-components/issues/1981
  preloader?: AnyStyledComponent;
  altColor?: ColorName;
  outlined?: boolean;
  noWrap?: boolean;
  icon?: ReactElement;
  text?: string;
  iconPosition?: 'start' | 'end';
  focusShadow?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>()

  const {
    children,
    loading,
    disabled,
    preloader: CustomPreloader,
    iconPosition = 'start',
    icon,
    text,
    width,
    ...otherProps
  } = props

  const shouldMeasureWidth = width === 'auto' && loading !== undefined && !!children
  const measuredWidth = shouldMeasureWidth
    ? buttonRef.current?.getBoundingClientRect().width
    : undefined

  return (
    <ButtonStyled
      isLoading={ loading }
      disabled={ disabled ?? loading }
      { ...otherProps }
      ref={ shouldMeasureWidth ? buttonRef : null }
      width={ loading && measuredWidth ? `${ measuredWidth }px` : width }>
      { loading && CustomPreloader && (<CustomPreloader />) }
      { (!loading && children) || (
        <ButtonContentWrapper isLoading={ !!loading }>
          { iconPosition === 'end' && text }
          { icon && (
            <IconWrapper size={ otherProps.size }>
              { icon }
            </IconWrapper>
          ) }
          { iconPosition === 'start' && text }
        </ButtonContentWrapper>
      ) }
    </ButtonStyled>
  )
}
