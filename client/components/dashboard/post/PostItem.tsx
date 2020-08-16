import React, { FC, useCallback, useState } from 'react'
import { PostHeader } from './PostHeader'
import { IPhoto } from '../../../interfaces/photo'
import { CommentTools } from './comment/CommentTools'
import { Comments } from './comment/Comments'
import {
  CreateCommentMutation,
  CreateCommentType,
  DeleteCommentMutation,
  DeleteCommentType,
  Exact,
  LikeMutation
} from '../../../geterated/apollo'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { IComment } from '../../../interfaces/comment'
import { TextArea } from '../../utils/TextArea'
import { MutationFunctionOptions } from '@apollo/client'
import { dateOptions } from '../../../utils/config'


type PropsType = {
  photo: IPhoto
  deleteCommentMutation: (options?: (MutationFunctionOptions<DeleteCommentMutation, Exact<{ data: DeleteCommentType }>> | undefined)) => Promise<any>
  likeMutation: (options?: (MutationFunctionOptions<LikeMutation, Exact<{ photoId: string }>> | undefined)) => Promise<any>
  createCommentMutation: (options?: (MutationFunctionOptions<CreateCommentMutation, Exact<{ data: CreateCommentType }>> | undefined)) => Promise<any>
}

type LikeType = {
  likeCount: number
  isLiked: boolean
}

export const PostItem: FC<PropsType> = React.memo(
    ({
       photo,
       createCommentMutation, deleteCommentMutation, likeMutation
     }) => {

      const [comments, setComments] = useState<IComment[]>(photo.comments)
      const [photoLikeInfo, setPhotoLikeInfo] = useState<LikeType>({likeCount: photo.likeCount, isLiked: photo.isLiked})

      const onDeleteComment = useCallback(async (id: string) => {
        try {
          await deleteCommentMutation({
            variables: {data: {id}},
            update: (cache) => {
              const newComments = [...comments].filter(comment => comment.id !== id)
              setComments(newComments)
              cache.modify({
                id: cache.identify({__ref: `Photo:${ photo.id }`}),
                fields: {
                  comments(cacheValue) {
                    return cacheValue.filter((v: IComment) => v.id !== id)
                  }
                }
              })
            }
          })
        } catch (e) {
          console.log(e)
        }
      }, [comments])

      const onLikeHandler = useCallback(async () => {
        try {
          await likeMutation({
            variables: {
              photoId: photo.id
            }, update: (cache) => {
              const counting = photoLikeInfo.isLiked ? -1 : 1
              setPhotoLikeInfo({
                likeCount: photoLikeInfo.likeCount + counting,
                isLiked: !photoLikeInfo.isLiked
              })
              cache.modify({
                id: cache.identify({__ref: `Photo:${ photo.id }`}),
                fields: {
                  isLiked(cacheValue) {
                    return !cacheValue
                  },
                  followerCount(cacheValue) {
                    return cacheValue + counting
                  }
                }
              })
            }
          })
        } catch (e) {
          console.log(e)
        }
      }, [photoLikeInfo])

      const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
        try {
          const response = await createCommentMutation({
            variables: {
              data
            }
          })
          if (response && response.data) {
            const newComments = [...comments]
            newComments.push(response.data.createComment as IComment)
            setComments(newComments)
            resetForm()
          }
        } catch (e) {
          console.log(e)
        }
      }, [comments])


      return (
          <div className="dashboard__content">
            <PostHeader
                isAuthor={photo.isAuthor}
                pictureUrl={ photo.user.pictureUrl }
                username={ photo.user.username }/>
            <div className="content__img">
              <img
                  alt="Не загрузилось"
                  src={ photo.pictureUrl }
                  className="content__img__item" sizes="610px"
              />
            </div>

            <div className="content__tools">
              <CommentTools
                  isLiked={ photoLikeInfo.isLiked }
                  onLike={ onLikeHandler }
              />

              <div className="content__likes">
                <span>Нравится { photoLikeInfo.likeCount } людям</span>
              </div>
              <Comments
                  onDeleteComment={ onDeleteComment }
                  comments={ comments }/>
              <div className="content__created">{ new Date(photo.date).toLocaleString('ru', dateOptions) }</div>
              <Formik<CreateCommentType>
                  onSubmit={ createCommentHandler }
                  initialValues={ {commentText: '', photoId: photo.id} }
              >
                { () => (
                    <Form className="comment__create">
                      <Field
                          required
                          placeholder="Введите комментарий"
                          className="comment__add"
                          name="commentText"
                          component={ TextArea }
                      />
                      <button
                          type="submit"
                          className="comment__btn">Отправить
                      </button>
                    </Form>
                ) }
              </Formik>
            </div>
          </div>
      )
    })
