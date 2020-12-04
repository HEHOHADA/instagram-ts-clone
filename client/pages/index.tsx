import React from 'react'

import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import { History } from '@/components/dashboard/History'
import { useFeedQuery, useMeQuery } from '@/geterated/apollo'
import { PhotoFeedType, Posts } from '@/components/dashboard/post/Posts'
import { UserProfileRecommendation } from '@/components/dashboard/UserProfileRecommendation'
import { RecommendationItems } from '@/components/recommendation/RecommendationItems'
import Loading from '@/components/utils/Loading'


const IndexPage = () => {
  const {data} = useMeQuery()
  const {data: dataFeed, loading, fetchMore, variables} = useFeedQuery({
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
        cursor: dataFeed?.feed.items[dataFeed?.feed.items.length - 1].date
      }
    })
  }
  return (
      <MainLayout title="Home">
        <div className="container dashboard">
          <div className="dashboard__main">
            <History/>
            <div className="dashboard__container_el">
              { dataFeed?.feed ? <Posts
                  feed={ dataFeed.feed.items as PhotoFeedType[] }/> :loading? <Loading/> :<h1>Нет постов</h1>}
            </div>
            { dataFeed?.feed.paginationInfo.hasMore ? (
                <button
                    disabled={ loading }
                    onClick={ onFetchMore }
                    className="comment__btn">load more</button>
            ) : null }
          </div>
          <div className="dashboard__recommendation">
            { data?.me ? <UserProfileRecommendation { ...data.me }/> : <Loading/> }
            <RecommendationItems/>
          </div>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(IndexPage)
