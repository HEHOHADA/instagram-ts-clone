import React, { ReactNode } from 'react'
import { DropDownContainer, DropDownMenu } from './DropDownStyled'

type PropsType = {
  children: ReactNode
}

export const DropDown = React.forwardRef<HTMLDivElement, PropsType>((props, ref) => {
  return (
    <DropDownContainer ref={ ref }>
      <DropDownMenu>
        { props.children }
      </DropDownMenu>
    </DropDownContainer>
  )
})
