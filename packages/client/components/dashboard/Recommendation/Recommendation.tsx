import React from 'react'
import { useMeQuery } from '@/geterated'
import Loading from '@/components/utils/Loading'
import { UserProfileRecommendation } from './UserProfileRecommendation'
import { RecommendationsContainer } from '../DashboardStyled'
import { RecommendationItems } from '@/components/recommendation/RecommendationItems'

export const Recommendation = () => {
  const { data, loading } = useMeQuery()

  return (
    <RecommendationsContainer>
      { data?.me && !loading ? <UserProfileRecommendation { ...data.me } /> : <Loading /> }
      <RecommendationItems />
    </RecommendationsContainer>
  )
}
