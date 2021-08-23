import styled from 'styled-components'
import { Box, BoxCenter, Container } from '@/components/common/Containers'
import { media } from '@/helpers'

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

export const DashboardContainer = styled(Container)`
  max-width: 950px;
  padding: 30px 30px 0;
  flex-direction: row;
  display: flex;
`

export const RecommendationsContainer = styled.aside`
  top: 88px;
  max-width: 293px;
  height: 100vh;
  right: 300px;

  ${media.kilo}{
    display: none;
  }  
  
  ${media.giga}{
    display: block;
  }
`
