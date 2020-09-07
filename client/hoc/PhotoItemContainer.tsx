import { gql } from '@apollo/client'
import { FormikHelpers } from 'formik'
import React, { useCallback, useRef } from 'react'
import { ModalRefType, ModalWindowContainer } from './ModalWindowContainer'
import { PhotoSettingsModal } from '../components/modal/PhotoSettingsModal'
import {
  CreateCommentType,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeMutation
} from '../geterated/apollo'
import { PhotoFeedType } from '../components/dashboard/post/Posts'


type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
  children?: ((props: PhotoItemType) => React.ReactNode | Element) | React.ReactNode | Element
}

export type PhotoItemType = {
  openModal: () => void
  createCommentHandler: () => void
  onDeleteComment: (id: string) => Promise<void>
  onLikeHandler: () => void
}


export const PhotoItemContainer = React.memo(({photo, deletePhoto, children}: PropsType) => {
  const modalRef = useRef<ModalRefType>(null)
  const openModal = useCallback(() => {
    modalRef.current?.openModal()
  }, [modalRef])

  const [likeMutation] = useLikeMutation()
  const [deleteCommentMutation] = useDeleteCommentMutation()

  const [createCommentMutation] = useCreateCommentMutation()
  const createCommentHandler = useCallback(async (data: CreateCommentType, {resetForm}: FormikHelpers<any>) => {
    try {
      const response = await createCommentMutation({
        variables: {
          data
        },
        update: (cache, {data}) => {
          cache.modify({
            id: `Photo:${ photo.id }`,
            fields: {
              commentCount(cachedValue) {
                return cachedValue + 1
              },
              comments(cachedValue) {
                const commentRef = {'__ref': `Comment:${ data?.createComment?.id }`}
                return [...cachedValue, commentRef]
              }
            }
          })
        }
      })
      if (response && response.data) {
        resetForm()
      }
    } catch (e) {
      console.log(e)
    }
  }, [])

  const onDeleteComment = useCallback(async (id: string) => {
    try {
      await deleteCommentMutation({
        variables: {data: {id}},
        update: (cache: any) => {
          cache.modify({
            id: `Photo:${ photo.id }`,
            fields: {
              commentCount(cachedValue: any) {
                return cachedValue - 1
              },
              comments(cachedValue: any) {
                return [...cachedValue].filter(t => !t.__ref.includes(id))
              }
            }
          })
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
        }, update: (cache: any) => {
          const counting = photo.isLiked ? -1 : 1
          const data = cache.readFragment({
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
  const childrenProps = {
    openModal,
    onDeleteComment,
    onLikeHandler,
    createCommentHandler
  }

  return (
      <>
        <ModalWindowContainer ref={ modalRef }>
          { (ref: ModalRefType) => (
              <PhotoSettingsModal
                  isAuthor={ photo.isAuthor }
                  deletePhoto={ () => deletePhoto(photo.id) }
                  { ...ref }/>) }
        </ModalWindowContainer>
        {
          // @ts-ignore
          children && children(childrenProps) }
      </>
  )
})
