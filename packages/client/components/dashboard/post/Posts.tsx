import React, { FC } from 'react'
import PostItem from '@/components/dashboard/post/PostItem'
import { IFeedQuery } from '@/geterated'
import { useDeletePhoto } from '@/hooks/useDeletePhoto'


export type PostsProps = {
  feed: IFeedQuery['feed']['items']
}

export const Posts: FC<PostsProps> = ({ feed, ...props }) => {
  const { deletePhoto } = useDeletePhoto()

  return (
    <>
      { feed.map(photo => (
        <PostItem
          onDeletePhoto={ deletePhoto }
          photo={ photo }
          { ...props }
          key={ photo.id }
        />
      )) }
    </>

  )
}
