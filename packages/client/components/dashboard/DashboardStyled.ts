import styled from 'styled-components'
import { Box, BoxCenter } from '@/components/common/Containers'

export const UserProfile = styled(BoxCenter)`
  margin: 16px 0;
`

export const UserInfo = styled(Box).attrs({ column: true })`
  margin-left: 20px;
`

export const UserInfoName = styled.span`
  letter-spacing: 1px;
  font-size: 14px;
  line-height: 16px;
`
