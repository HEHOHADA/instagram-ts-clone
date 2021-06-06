import styled from 'styled-components'
import { Box } from '@/components/common/Containers'
import { ImageWrapper } from '@/components/nav/NavbarItems/NavbarItemStyled'
import { LinkStyled } from '@/components/link/LinkStyled'

export const PostHeaderWrapper = styled(Box).attrs({ as: 'header' })`
  height: 60px;
  align-items: center;
  padding: 16px;
`

export const ImageLinkWrapper = styled(ImageWrapper).attrs({as:'a'})``

export const UserLinkBlack = styled(LinkStyled)`
  margin-left: 12px;
  font-size: 12px;
  color: black;
  font-weight: bold;
  letter-spacing: 1px;
`

export const PostHeaderOptions = styled.div`
  right: 0;
  position: absolute;
  margin-right: 5px;
  cursor: pointer;
`
