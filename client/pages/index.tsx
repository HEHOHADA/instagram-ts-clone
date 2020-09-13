import React from 'react'
import MainLayout from '../components/MainLayout'
import { History } from '../components/dashboard/History'
import { useFeedQuery, useMeQuery } from '../geterated/apollo'
import { useIsAuth } from '../utils/useIsAuth'
import { PhotoFeedType, Posts } from '../components/dashboard/post/Posts'
import { UserProfileRecommendation } from '../components/dashboard/UserProfileRecommendation'
import withApollo from '../lib/withApollo'


const IndexPage = () => {
  useIsAuth()
  const {data} = useMeQuery()
  const {data: dataFeed, loading, fetchMore, variables} = useFeedQuery({
    variables: {
      limit: 2,
      cursor: null as null | string
    },
    notifyOnNetworkStatusChange: true
  })

  if (!data||!dataFeed) {
    return null
  }
  const {me} = data

  return (
      <MainLayout title="Home">
        <div className="container dashboard">
          <div className="dashboard__main">
            <History/>
            <div className="dashboard__container_el">
              { dataFeed?.feed && <Posts
                  feed={ dataFeed?.feed.photos as PhotoFeedType[] }/> }
            </div>
            { dataFeed?.feed.feedInfo.hasMore ? (
                <button
                    disabled={ loading }
                    onClick={ async () => {
                      await fetchMore({
                        variables: {
                          limit: variables!.limit,
                          cursor:dataFeed?.feed.photos[dataFeed?.feed.photos.length-1].date
                        }
                      })
                    } }
                    className="comment__btn">load more</button>
            ) : null }
          </div>
          <div className="dashboard__recommendation">
            <UserProfileRecommendation
                username={ me!.username }
                pictureUrl={ me!.pictureUrl }
                fullName={ me!.fullName }
            />
            <div className="dashboard__recommendation__items">
              <div className="recommend__helper">
                        <span className="recommend__for__you">
                            Рекомендации для вас
                        </span>
                <a className="recommend__all">Все</a>
              </div>
              <ul className="recommendations">
                <li className="recommend__item">
                  <div className="recommend__img">
                    <img alt="Фото профиля dimasik33junior" className="_6q-tv" data-testid="user-avatar"
                         draggable="false"
                         src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/89261045_525025175100883_7575808430191935488_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=bA628poa9SUAX-_rpAq&amp;oh=247e871a40b851ff0c961e04965c782d&amp;oe=5F3E8BC9"/>
                  </div>
                  <div className="recommend__info">
                    <a className="recommend__username">dima</a>
                    <div className="recommend__name">Dima</div>
                    <div className="recommend__info__item">Подписчки</div>
                  </div>
                  <button className="recommend__sub">Подписаться</button>
                </li>
                <li className="recommend__item">
                  <div className="recommend__img">
                    <img alt="Фото профиля dimasik33junior" className="_6q-tv" data-testid="user-avatar"
                         draggable="false"
                         src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/89261045_525025175100883_7575808430191935488_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=bA628poa9SUAX-_rpAq&amp;oh=247e871a40b851ff0c961e04965c782d&amp;oe=5F3E8BC9"/>
                  </div>
                  <div className="recommend__info">
                    <a className="recommend__username">dima</a>
                    <div className="recommend__name">Dima</div>
                    <div className="recommend__info__item">Подписчки</div>
                  </div>
                  <button className="recommend__sub">Подписаться</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
  )
}


export default withApollo({ssr: true})(IndexPage)
