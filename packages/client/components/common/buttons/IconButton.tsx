import styled from 'styled-components'
import React, { ReactElement, Ref, forwardRef } from 'react'
import { BaseButton, BaseButtonProps } from './BaseButton'
import { themeFontSize } from '@/themes'

const Button = styled(BaseButton)<IconButtonProps>`
  display: flex;
  align-items: center;
  border-radius: ${ ({ round }) => round && '50%' };
  justify-content: ${ ({ round }) => round && 'center' };
  position: relative;
  z-index: ${ ({ zIndex }) => zIndex };
  width: ${ ({ width }) => width };
  height: ${ ({ height }) => height };
  line-height: ${ ({ height }) => height || '20px' };
  font-size: ${ themeFontSize('medium') };

  svg, i {
    display: inline-block;
  }
`

export interface IconButtonProps extends BaseButtonProps {
  className?: string;
  icon?: ReactElement;
  zIndex?: number;
  forwardedAs?: any;
  round?: boolean;
}

type ButtonRef = Ref<HTMLButtonElement>;

export const IconButton = forwardRef((props: IconButtonProps, ref: ButtonRef) => {
  const { icon, children, ...otherProps } = props
  return (
    <Button { ...otherProps } ref={ ref }>
      { icon }
      { children }
    </Button>
  )
})

IconButton.displayName = 'IconButton'
