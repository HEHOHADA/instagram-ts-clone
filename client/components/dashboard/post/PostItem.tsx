import React, { FC, useCallback, useRef } from 'react'
import { PostHeader } from './PostHeader'
import { CommentTools } from './comment/CommentTools'
import { Comments } from './comment/Comments'
import {
  CommentItemFragment,
  CreateCommentType,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeMutation
} from '../../../geterated/apollo'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { TextArea } from '../../utils/TextArea'
import { dateOptions } from '../../../utils/config'
import { ModalRefType, ModalWindowContainer } from '../../modal/ModalWindowContainer'
import { PhotoSettingsModal } from '../../modal/PhotoSettingsModal'
import { PhotoFeedType } from './Posts'
import { gql } from '@apollo/client'


type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
}


export const PostItem: FC<PropsType> = React.memo(
    ({
       photo, deletePhoto
     }) => {

      const [createCommentMutation] = useCreateCommentMutation()
      const modalRef = useRef<ModalRefType>(null)
      const openModal = useCallback(() => {
        modalRef.current?.openModal()
      }, [modalRef])

      const [likeMutation] = useLikeMutation()
      const [deleteCommentMutation] = useDeleteCommentMutation()

      const onDeleteComment = useCallback(async (id: string) => {
        try {
          await deleteCommentMutation({
            variables: {data: {id}},
            update: (cache) => {
              cache.evict({
                id: cache.identify({__ref: `Comment:${ id }`})
              })
            }
          })
        } catch (e) {
          console.log(e)
        }
      }, [])

      const onLikeHandler = async () => {
        try {
          await likeMutation({
            variables: {
              photoId: photo.id
            }, update: (cache) => {
              const counting = photo.isLiked ? -1 : 1
              const data = cache.readFragment<{
                id: string,
                likeCount: number,
                isLiked: boolean
              }>({
                id: `Photo:${ photo.id }`,
                fragment: gql`
                    fragment _ on Photo {
                        id
                        likeCount
                        isLiked
                    }
                `,
              })

              if (data) {
                cache.writeFragment({
                  id: `Photo:${ photo.id }`,
                  fragment: gql`
                      fragment __ on Photo {
                          likeCount
                          isLiked
                      }
                  `,
                  data: {likeCount: data.likeCount + counting, isLiked: !data.isLiked}
                })
              }
            }
          })
        } catch (e) {
          console.log(e)
        }
      }

      const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
        try {
          const response = await createCommentMutation({
            variables: {
              data
            },
            update: (cache, {data}) => {
              const cacheFragment = cache.readFragment<{
                id: string,
                comments: CommentItemFragment[]
              }>({
                id: `Photo:${ photo.id }`,
                fragment: gql`
                    fragment _ on Photo {
                        id
                        comments
                    }
                `,
              })

              if (cacheFragment && data?.createComment) {
                const newComments = [...cacheFragment.comments].push(data?.createComment)
                cache.writeFragment({
                  id: `Photo:${ photo.id }`,
                  fragment: gql`
                      fragment __ on Photo {
                          comments
                      }
                  `,
                  data: {comments: newComments}
                })
              }
            },
          })
          if (response && response.data) {
            resetForm()
          }
        } catch (e) {
          console.log(e)
        }
      }, [])


      return (
          <div className="dashboard__content">
            <ModalWindowContainer ref={ modalRef }>
              { (ref: ModalRefType) => (
                  <PhotoSettingsModal
                      isAuthor={ photo.isAuthor }
                      deletePhoto={ () => deletePhoto(photo.id) }
                      { ...ref }/>) }
            </ModalWindowContainer>
            <PostHeader
                onOpenModal={ openModal }
                isAuthor={ photo.isAuthor }
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
                  isLiked={ photo.isLiked }
                  onLike={ onLikeHandler }
              />
              <div className="content__likes">
                <span>{ photo.postText }</span>
              </div>
              <div className="content__likes">
                <span>Нравится { photo.likeCount } людям</span>
              </div>
              { photo.comments
              && <Comments
                  onDeleteComment={ onDeleteComment }
                  comments={ photo.comments }/> }
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
