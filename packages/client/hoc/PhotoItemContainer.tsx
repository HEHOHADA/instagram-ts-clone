import React, { FC } from 'react'
import { FormikHelpers } from 'formik'
import { ICreateCommentType } from '@instagram/common'
import { useModal } from '@/hooks/useModal'
import { ModalRefType } from './ModalWindowContainer'
import { useLikeHandler } from '@/hooks/useLikeHandler'
import { PhotoFeedType } from '@/components/dashboard/post/Posts'
import { useCommentDeleteHandler } from '@/hooks/useCommentDeleteHandler'
import { useCommentCreateHandler } from '@/hooks/useCommentCreateHandler'
import { PhotoSettingsModal } from '@/components/modal/PhotoSettingsModal'

type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
  children: FC<PhotoItemType>
}

export type PhotoItemType = {
  openModal: () => void
  createCommentHandler: (data: ICreateCommentType, {resetForm}: FormikHelpers<any>) => Promise<void>
  onDeleteComment: (id: string) => Promise<void>
  onLikeHandler: () => Promise<void>
}

export const PhotoItemContainer = React.memo(({photo, deletePhoto, children}: PropsType) => {
  const {openModal, ModalWindow} = useModal()
  const {createCommentHandler} = useCommentCreateHandler()
  const {onDeleteComment} = useCommentDeleteHandler({photoId: photo.id})
  const {onLikeHandler} = useLikeHandler({photoId: photo.id, isLiked: photo.isLiked})

  const childrenProps = {
    openModal,
    onDeleteComment,
    onLikeHandler,
    createCommentHandler
  }

  return (
      <>
        <ModalWindow>
          { (ref: ModalRefType) => (
              <PhotoSettingsModal
                  isAuthor={ photo.isAuthor }
                  deletePhoto={ () => deletePhoto(photo.id) }
                  { ...ref }/>)
          }
        </ModalWindow>
        { children(childrenProps) }
      </>
  )
})
