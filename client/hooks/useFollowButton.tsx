import Link from 'next/link'
import React, { useCallback } from 'react'

import { followCallback } from '@/utils/followFunction'
import { FollowButton } from '@/components/profile/FollowButton'
import { useFollowUserMutation, useUnFollowUserMutation } from '@/geterated/apollo'

export default function useFollowButton() {
  const [unFollowUser] = useUnFollowUserMutation()
  const [followUser] = useFollowUserMutation()
  const followButton = useCallback((isFollowing: boolean, id: string, userId?: string) => {
    const onClick = isFollowing
        ? followCallback(unFollowUser, -1)
        : followCallback(followUser, 1)
    const text = isFollowing ? 'Отписаться' : 'Подписаться'
    if (!userId) {
      return (
          <Link href="/accounts/login">
            <a className="profile__edit">Войти в аккаунт</a>
          </Link>
      )
    }
    return (
        <FollowButton
            text={ text }
            className={ 'profile__edit' }
            onClick={ () => onClick(id, userId) }/>
    )
  }, [])
  return {
    followButton
  }
}
