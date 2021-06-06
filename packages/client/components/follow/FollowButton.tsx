import Link from 'next/link'
import React, { FC, useCallback } from 'react'

import { followCallback } from '@/utils/followFunction'
import { Button } from '@/components/utils/Button'
import { useFollowUserMutation, useUnFollowUserMutation } from '@/geterated'

export type FollowButtonProps = {
  isFollowing: boolean, id: string, userId?: string
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
      <Link href='/accounts/login'>
        <a className='profile__edit'>Войти в аккаунт</a>
      </Link>
    )
  }
  return (
    <Button
      text={ text }
      className='profile__edit'
      onClick={ () => onClick(id, userId) } />
  )

}
