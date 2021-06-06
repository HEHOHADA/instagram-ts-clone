import React from 'react'
import Link, { LinkProps } from 'next/link'
import { LinkStyled } from './LinkStyled'
import { IUser } from '@/geterated'

export type UserLinkProps = Omit<LinkProps, 'href' | 'as'> & Pick<IUser, 'username'>

export const UserLink: React.FC<UserLinkProps> = ({ username, children, ...linkProps }) => {

  return (
    <Link passHref { ...linkProps } href='/[username]' as={ `/${ username }` }>
      { children || <LinkStyled>{ username }</LinkStyled> }
    </Link>
  )
}
