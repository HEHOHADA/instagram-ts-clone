import React, { FC } from 'react'
import styled from 'styled-components'
import { RedirectComponentType } from '../auth/RedirectComponent'
import { Link } from '@/components/link/Link'
import { Icon } from '../icons'

export type LinkRedirectComponentType = {
  iconName: string,
  as?: string
}

type PropsType = LinkRedirectComponentType & RedirectComponentType

const LinkIcon = styled.a`
  height: 50px;
  align-items: center;
  border-radius: 8px;
  transition: background 500ms;
  padding: 0.5rem;
  display: flex;

  &:hover {
    background-color: #e2e3e6;
  }
`

export const DropdownItem: FC<PropsType> = ({ text, as, link, iconName }) => {
  return (
    <Link passHref as={ as } href={ as ? link : undefined } to={ link }>
      <LinkIcon>
        <Icon iconName={ iconName } />
        { text }
      </LinkIcon>
    </Link>
  )
}
