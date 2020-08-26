import React from 'react'
import MainLayout from '../components/MainLayout'
import { History } from '../components/dashboard/History'
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useDeletePhotoMutation,
  useFeedQuery,
  useLikeMutation,
  useMeQuery
} from '../geterated/apollo'
import withApollo from '../lib/withApollo'
import { useIsAuth } from '../utils/useIsAuth'
import { UserProfileRecommendation } from '../components/dashboard/UserProfileRecommendation'
import { Posts } from '../components/dashboard/post/Posts'


const IndexPage = () => {

  const {data} = useMeQuery()
  useIsAuth()
  const {data: dataFeed} = useFeedQuery()

  if (!data) {
    return null
  }
  if (!dataFeed) {
    return null
  }
  return (
      <MainLayout title="Home">
        <div className="container dashboard">
          <div className="dashboard__main">
            <History/>
            <div>
              <Posts
                  feed={ dataFeed.feed as any }/>
            </div>
          </div>
          <div className="dashboard__recommendation">
            <UserProfileRecommendation
                username={ data!.me!.username }
                pictureUrl={ data!.me!.pictureUrl }
                fullName={ data!.me!.fullName }
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


// IndexPage.getInitialProps = async (ctx: MyContext) => {
//   if (!ctx.apolloClient.readQuery({query: MeDocument})?.me) {
//     const meQueryData = await ctx.apolloClient.query({
//       query: MeDocument
//     })
//     if (meQueryData.data.me) {
//       ctx.apolloClient.writeQuery({query: MeDocument, data: meQueryData.data})
//     }
//   }
//
//   const me = ctx.apolloClient.readQuery<MeQuery>({query: MeDocument})?.me
//
//   if (!me) {
//     Redirect(ctx, '/accounts/login')
//   }
//
//
//   return {
//     me, feed
//   }
// }

export default withApollo({ssr: true})(IndexPage)
