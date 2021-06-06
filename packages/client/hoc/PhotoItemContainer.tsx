import React, { FC } from 'react'
import { ModalRefType } from './ModalWindowContainer'
import { PhotoSettingsModal } from '@/components/modal/PhotoSettingsModal'
import { DeletePhotoGetters } from '@/hooks/useDeletePhoto'
import {
  CommentDelete,
  CreateCommentGetters,
  LikeGetters,
  ModalGetters,
  useCommentCreateHandler,
  useCommentDeleteHandler,
  useLikeHandler,
  useModal
} from '@/hooks'
import { IPhoto } from '@/geterated'

type PropsType = DeletePhotoGetters & {
  photo: IPhoto
  children: FC<PhotoItemType>
}

export type PhotoItemType =
  CommentDelete
  & CreateCommentGetters
  & LikeGetters
  & Pick<ModalGetters, 'onOpenModal'>

export type Getters<T> = {
  [Property in keyof T as T[Property] extends (...args: any[]) => any ? `on${ Capitalize<string & Property> }` : Property]: T[Property]
}

export const PhotoItemContainer = React.memo(({ photo, onDeletePhoto, children }: PropsType) => {
  const { openModal, ModalWindow } = useModal()
  const { createComment } = useCommentCreateHandler()
  const { deleteComment } = useCommentDeleteHandler({ photoId: photo.id })
  const { like } = useLikeHandler({ photoId: photo.id, isLiked: photo.isLiked })

  const childrenProps = {
    onOpenModal: openModal,
    onDeleteComment: deleteComment,
    onLike: like,
    onCreateComment: createComment
  }

  return (
    <>
      <ModalWindow>
        { (ref: ModalRefType) => (
          <PhotoSettingsModal
            isAuthor={ photo.isAuthor }
            deletePhoto={ () => onDeletePhoto(photo.id) }
            { ...ref } />)
        }
      </ModalWindow>
      { children(childrenProps) }
    </>
  )
})
