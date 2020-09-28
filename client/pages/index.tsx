import React from 'react'
import MainLayout from '../components/MainLayout'
import { History } from '../components/dashboard/History'
import { useFeedQuery, useMeQuery } from '../geterated/apollo'
import { PhotoFeedType, Posts } from '../components/dashboard/post/Posts'
import { UserProfileRecommendation } from '../components/dashboard/UserProfileRecommendation'
import withApollo from '../lib/withApollo'
import { RecommendationItems } from '../components/recommendation/RecommendationItems'


const IndexPage = () => {
  const {data} = useMeQuery()
  const {data: dataFeed, loading, fetchMore, variables} = useFeedQuery({
    variables: {
      limit: 2,
      cursor: null as null | string
    },
    notifyOnNetworkStatusChange: true
  })

  if (!data || !dataFeed) {
    return null
  }
  const {me} = data
  const onFetchMore = async () => {
    await fetchMore({
      variables: {
        limit: variables!.limit,
        cursor: dataFeed?.feed.photos[dataFeed?.feed.photos.length - 1].date
      }
    })
  }
  return (
      <MainLayout title="Home">
        <div className="container dashboard">
          <div className="dashboard__main">
            <History/>
            <div className="dashboard__container_el">
              { dataFeed?.feed && <Posts
                  feed={ dataFeed.feed.photos as PhotoFeedType[] }/> }
            </div>
            { dataFeed?.feed.feedInfo.hasMore ? (
                <button
                    disabled={ loading }
                    onClick={ onFetchMore }
                    className="comment__btn">load more</button>
            ) : null }
          </div>
          <div className="dashboard__recommendation">
            <UserProfileRecommendation
                username={ me!.username }
                pictureUrl={ me!.pictureUrl }
                fullName={ me!.fullName }
            />
            <RecommendationItems/>
          </div>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(IndexPage)
