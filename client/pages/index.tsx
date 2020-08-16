import React  from 'react'
import MainLayout from '../components/MainLayout'
import { MyContext } from '../interfaces/MyContext'
import { History } from '../components/dashboard/History'
import {
  FeedDocument,
  FeedQuery,
  MeDocument,
  MeQuery, useCreateCommentMutation, useDeleteCommentMutation,
  useLikeMutation
} from '../geterated/apollo'
import { UserProfileRecommendation } from '../components/dashboard/UserProfileRecommendation'
import { IUserMe } from '../interfaces'
import { IPhoto } from '../interfaces/photo'
import { Posts } from '../components/dashboard/post/Posts'
import Redirect from '../lib/redirect'

type PropsType = {
  me: IUserMe,
  feed: IPhoto[]
}

const IndexPage = ({me, feed}: PropsType) => {
  const [createComment] = useCreateCommentMutation()
  const [like] = useLikeMutation()
  const [deleteComment] = useDeleteCommentMutation()

  return (
      <MainLayout title="Home | Instagram">
        <div className="container dashboard">
          <div className="dashboard__main">
            <History/>
            <div>
              <Posts
                  deleteCommentMutation={deleteComment}
                  likeMutation={like}
                  createCommentMutation={ createComment }
                  feed={ feed }/>
            </div>
          </div>
          <div className="dashboard__recommendation">
            <UserProfileRecommendation
                username={ me.username }
                pictureUrl={ me.pictureUrl }
                fullName={ me.fullName }
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


IndexPage.getInitialProps = async (ctx: MyContext) => {
  if (!ctx.apolloClient.readQuery({query: MeDocument})?.me) {
    const meQueryData = await ctx.apolloClient.query({
      query: MeDocument
    })
    if (meQueryData.data.me) {
      ctx.apolloClient.writeQuery({query: MeDocument, data: meQueryData.data})
    }
  }

  const me = ctx.apolloClient.readQuery<MeQuery>({query: MeDocument})?.me

  if (!me) {
    Redirect(ctx, '/accounts/login')
  }
  const feedResponse = await ctx.apolloClient.query<FeedQuery>({query: FeedDocument})

  ctx.apolloClient.writeQuery({query: FeedDocument, data: feedResponse.data})

  const feed = feedResponse.data?.feed

  return {
    me, feed
  }
}

export default IndexPage
