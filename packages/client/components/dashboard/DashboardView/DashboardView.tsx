import React from 'react'
import { History } from '@/components/dashboard/History'
import { Posts } from '@/components/dashboard/post/Posts'
import Loading from '@/components/utils/Loading'
import { useFeedQuery } from '@/geterated'
import { DashboardMain, PostsContainer } from './DashboardViewStyled'
import { SecondaryButton } from '@/components/common/buttons'

export const DashboardView = () => {
  const { data, loading, fetchMore, variables } = useFeedQuery({
    variables: {
      limit: 2,
      cursor: null as null | string
    },
    notifyOnNetworkStatusChange: true
  })

  const onFetchMore = async () => {
    await fetchMore({
      variables: {
        limit: variables!.limit,
        cursor: data?.feed.items[data?.feed.items.length - 1].date
      }
    })
  }

  return (
    <DashboardMain>
      <History />
      <PostsContainer>
        { data?.feed
          ? <Posts
            feed={ data.feed.items } />
          : loading
            ? <Loading /> :
            <h1>Нет постов</h1> }
      </PostsContainer>
      { data?.feed.paginationInfo.hasMore ? (
        <SecondaryButton
          loading={ loading }
          onClick={ onFetchMore }
          text='load more'
          size='medium' />
      ) : null }
    </DashboardMain>
  )
}
