import React, { FC } from 'react'
import { FormikHelpers } from 'formik'
import { ModalRefType } from './ModalWindowContainer'
import { PhotoFeedType } from '@/components/dashboard/post/Posts'
import { PhotoSettingsModal } from '@/components/modal/PhotoSettingsModal'
import { useCommentDeleteHandler, useCommentCreateHandler, useModal, useLikeHandler } from '@/hooks'
import { ICreateCommentType } from '@/geterated'

type PropsType = {
  photo: PhotoFeedType
  deletePhoto: (id: string) => Promise<void>
  children: FC<PhotoItemType>
}

export type PhotoItemType = {
  openModal: () => void
  createCommentHandler: (data: ICreateCommentType, { resetForm }: FormikHelpers<ICreateCommentType>)
    => Promise<void>
  onDeleteComment: (id: string) => Promise<void>
  onLikeHandler: () => Promise<void>
}

export const PhotoItemContainer = React.memo(({ photo, deletePhoto, children }: PropsType) => {
  const { openModal, ModalWindow } = useModal()
  const { createCommentHandler } = useCommentCreateHandler()
  const { onDeleteComment } = useCommentDeleteHandler({ photoId: photo.id })
  const { onLikeHandler } = useLikeHandler({ photoId: photo.id, isLiked: photo.isLiked })

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
            { ...ref } />)
        }
      </ModalWindow>
      {
        // @ts-ignore
        children(childrenProps) }
    </>
  )
})
