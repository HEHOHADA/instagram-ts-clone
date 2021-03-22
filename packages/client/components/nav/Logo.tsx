import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

export const LogoInsta = styled(Image).attrs({
  src: '/static/img/735145cfe0a4.png',
  height: 30,
  width: 100
})`
  cursor: pointer;
`

export const Logo = React.forwardRef((props, _ref) => {
  return (
    <LogoInsta>{ props.children }</LogoInsta>
  )
})
