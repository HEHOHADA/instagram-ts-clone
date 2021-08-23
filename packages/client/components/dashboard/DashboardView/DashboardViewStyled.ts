import styled from 'styled-components'
import { Box } from '@/components/common/Containers'
import { media } from '@/helpers'

export const DashboardMain = styled(Box)`
  width: 100%;
  float: left;

  ${ media.kilo } {
    margin-right: 0;
    max-width: none;
  }

  ${ media.mega } {
    margin-right: 30px;
    max-width: 620px;
  }
`

export const PostsContainer = styled.div`
  :last-child {
    margin-bottom: 0;
  }
`
