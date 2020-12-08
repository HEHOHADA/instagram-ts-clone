import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import Loading from '@/components/utils/Loading'
import { PostHeader } from '@/components/dashboard/post/PostHeader'
import { CreateCommentForm } from '@/components/photo/CreateCommentForm'
import { Comments } from '@/components/dashboard/post/comment/Comments'
import { PhotoItemContainer, PhotoItemType } from '@/hoc/PhotoItemContainer'
import { CommentTools } from '@/components/dashboard/post/comment/CommentTools'
import { useDeletePhotoMutation, useViewPhotoByIdQuery, ViewPhotoByIdQuery } from '@/geterated/apollo'

type ViewPhotoByIdType = ViewPhotoByIdQuery['viewPhotoById']

const PhotoViewPost = () => {
  const router = useRouter()
  const [deletePhotoMutation] = useDeletePhotoMutation()
  const deletePhoto = useCallback(async (id: string) => {
    await deletePhotoMutation({
      variables: {id},
      update: (cache) => {
        cache.evict({id: cache.identify({__ref: `Photo:${ id }`})})
      }
    })
  }, [deletePhotoMutation])
  const url = typeof router.query.photoId === 'string' ? router.query.photoId : -1
  const {data, loading} = useViewPhotoByIdQuery({
    skip: url === -1,
    variables: {
      id: url as string
    }
  })

  let body: JSX.Element | null = null

  if (!data && !loading) {
    body = <h1 style={ {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      fontSize: '40px'
    } }>Такого поста нет</h1>
  } else if (!data && loading) {
    body = <Loading/>
  } else {
    const {
      pictureUrl,
      user, isLiked, isAuthor,
      likeCount,
      postText, id, comments
    }: ViewPhotoByIdType = data!.viewPhotoById


    body = <div className="photo__container">
      <PhotoItemContainer
          photo={ data!.viewPhotoById }
          deletePhoto={ deletePhoto }>
        { ({
             openModal, onLikeHandler,
             onDeleteComment,
             createCommentHandler
           }: PhotoItemType) => (
            <>
              <div className="content__img">
                <img
                    alt="Не загрузилось"
                    src={ pictureUrl }
                    className="content__img__item" sizes="610px"
                />
              </div>
              <div className="content__img__info">
                <PostHeader
                    onOpenModal={ openModal }
                    isAuthor={ isAuthor }
                    pictureUrl={ user.pictureUrl }
                    username={ user.username }/>
                <div className="content__img__comments">
                  { comments && <Comments
                      onDeleteComment={ onDeleteComment }
                      comments={ comments }/> }
                </div>
                <div className="content__tools">
                  <CommentTools
                      onLike={ onLikeHandler }
                      isLiked={ isLiked }
                  />
                  <div className="content__likes">
                    <span>{ postText }</span>
                  </div>
                  <div className="content__likes">
                    <span>Нравится { likeCount } людям</span>
                  </div>

                  <div className="content__created"/>
                  <CreateCommentForm photoId={ id } createCommentHandler={ createCommentHandler }/>
                </div>
              </div>
            </>
        ) }
      </PhotoItemContainer>
    </div>
  }

  return (
      <MainLayout title={ 'Photo by ...' }>
        { body }
      </MainLayout>
  )
}

export default withApollo({ssr: true})(PhotoViewPost)
