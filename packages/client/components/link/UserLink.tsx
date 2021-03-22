import React from 'react'
import Link, { LinkProps } from 'next/link'
import { LinkStyled } from './LinkStyled'

export interface UserLinkProps extends Omit<LinkProps, 'href' | 'as'> {
  username: string
}

export const UserLink: React.FC<UserLinkProps> = ({ username, children, ...linkProps }) => {

  return (
    <Link passHref { ...linkProps } href='/[username]' as={ `/${ username }` }>
      { children || <LinkStyled>{ username }</LinkStyled> }
    </Link>
  )
}
