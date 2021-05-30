import React, { FC } from 'react'
import styled from 'styled-components'
import { RedirectComponentType } from '../auth/RedirectComponent'
import { Link } from '@/components/link/Link'
import { Icon } from '@/components/common/icons/Icon'

export type LinkRedirectComponentType = {
  iconName: string,
  as?: string,
  passHref?: boolean
}

type PropsType = LinkRedirectComponentType & RedirectComponentType

const LinkIcon = styled(Link)`
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

export const DropdownItem: FC<PropsType> = ({ text, link, as, iconName }) => {
  return (
    <LinkIcon
      as={ as } href={ link }>
      <Icon iconName={ iconName } />
      { text }
    </LinkIcon>
  )
}
