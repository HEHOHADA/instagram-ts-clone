import styled from 'styled-components'
import { Box } from '@/components/common/Containers'
import { IconWrapper } from '@/components/icons/IconStyled'
import { LinkStyled } from '@/components/link/LinkStyled'

export const CommentsContainer = styled.div`
  margin: 0 0 auto;
  padding-left: 16px;
  flex-direction: column;
`

export const CommentContainer = styled(Box).attrs({ as: 'li' })`
  margin-bottom: 4px;
`

export const CommentIcon = styled(IconWrapper).attrs({ as: 'span' })`
  position: absolute;
  cursor: pointer;
  margin-right: 10px;
  right: 0;
`

export const CommentUserLink = styled(LinkStyled)`
  font-size: 14px;
  font-weight: bold;
  margin-right: 5px;
`

export const CommentText = styled.p`
  font-size: 14px;
  margin-right: 5px;
`

export const CommentToolsWrapper = styled(Box)`
  align-items: flex-start;
  padding: 0 16px;
  height: 40px;
  width: 100%;
`

export const DefaultTool = styled.div`
  padding: 8px;
  cursor: pointer;

  &:nth-child(1) {
    padding: 8px 8px 0 0;
  }
`

export const SaveTool = styled.div`
  right: 0;
  position: absolute;
  padding: 8px 8px 0;
  cursor: pointer;
`
