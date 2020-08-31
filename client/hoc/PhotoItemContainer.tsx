import React, { FC, PropsWithChildren, useCallback, useRef } from 'react'
import { useDeleteCommentMutation, useLikeMutation } from '../../../geterated/apollo'
import { ModalRefType, ModalWindowContainer } from '../../modal/ModalWindowContainer'
import { PhotoSettingsModal } from '../../modal/PhotoSettingsModal'
import { PhotoFeedType } from './Posts'
import { gql } from '@apollo/client'


type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
}

type ChildrenProps = {
  openModal: () => void
  deletePhoto: () => void
  onDeleteComment: () => void,
  photo: any
  onLikeHandler: () => void
}


export const PhotoItemContainer: FC<PropsType > = React.memo(
    ({
       photo, deletePhoto, children
     }) => {

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
        deletePhoto,
        onDeleteComment,
        photo,
        onLikeHandler
      }

      return (
          <div className="dashboard__content">
            <ModalWindowContainer ref={ modalRef }>
              { (ref: ModalRefType) => (
                  <PhotoSettingsModal
                      isAuthor={ photo.isAuthor }
                      deletePhoto={ () => deletePhoto(photo.id) }
                      { ...ref }/>) }
            </ModalWindowContainer>
            { children && children(childrenProps) }
          </div>
      )
    })
