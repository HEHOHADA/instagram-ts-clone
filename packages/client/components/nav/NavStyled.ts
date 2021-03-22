import styled from 'styled-components'
import { themeColor } from '@/themes'
import { BoxCenter } from '@/components/common/Containers'
import Image from 'next/image'
import React from 'react'

export const NavContainer = styled.nav`
  top: 0;
  background: white;
  font-size: 20px;
  position: fixed;
  height: 54px;
  z-index: 1000;
  justify-content: center;
  border-bottom: 1px solid ${ themeColor('borderColor') };
  display: flex;
  width: 100%;
`

export const HeaderItems = styled(BoxCenter)`
  width: 100%;
  background-color: ${ themeColor('white') };
  max-width: 950px;
`
