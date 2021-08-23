import React, { FC } from 'react'

import { Link } from '@/components/link'
import { SecondaryButton } from '../common'
import { followCallback } from '@/utils/followFunction'
import { IUser, useFollowUserMutation, useUnFollowUserMutation } from '@/geterated'

export type FollowButtonProps = Pick<IUser, 'isFollowing' | 'id'> & {
  userId?: string
}

export const FollowButton: FC<FollowButtonProps> = (props) => {
  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()
  const { isFollowing, userId, id } = props
  const onClick = isFollowing
    ? followCallback(unFollowUser, -1)
    : followCallback(followUser, 1)
  const text = isFollowing ? 'Отписаться' : 'Подписаться'
  if (!userId) {
    return (
      <Link to='login'>
        <a className='profile__edit'>Войти в аккаунт</a>
      </Link>
    )
  }
  return (
    <SecondaryButton
      text={ text }
      onClick={ () => onClick(id, userId) }
      size='medium' />
  )

}
