import React from 'react'
import Link, { LinkProps } from 'next/link'
import { LinkStyled } from './LinkStyled'
import { IUser } from '@/geterated'
import { StyledComponent } from 'styled-components'

export type UserLinkProps = Omit<LinkProps, 'href' | 'as'> & Pick<IUser, 'username'> & {
  withWrapper?: boolean
  linkWrapper?: StyledComponent<'a', any>
}

export const UserLink: React.FC<UserLinkProps> = ({
  username,
  withWrapper,
  children,
  linkWrapper: LinkWrapper = LinkStyled,
  ...linkProps
}) => {
  const Content = withWrapper && children ? <LinkWrapper> { children }</LinkWrapper> : children ||
    <LinkWrapper>{ username }</LinkWrapper>

  return (
    <Link passHref { ...linkProps } href='/[username]' as={ `/${ username }` }>
      { Content }
    </Link>
  )
}
