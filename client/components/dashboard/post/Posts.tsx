import React, { FC } from 'react'
import { IPhoto } from '../../../interfaces/photo'
import { PostItem } from './PostItem'

type PropsType = {
  feed: IPhoto[]
}

export const Posts: FC<PropsType> = ({feed}) => {

  return (
      <>
        { feed.map(photo => (
            <PostItem
                key={ photo.id }
                photo={ photo }/>
        )) }
      </>

  )
}
