import React from 'react'
import Link from 'next/link'
import { RedirectComponentType } from '../auth/RedirectComponent'
import { NavItemWrapper } from './NavbarItems/NavbarItemStyled'
import { Icon } from '../icons'

export const NavItem = ({ link, as, text }: RedirectComponentType & { as?: string }) => {
  return (
    <NavItemWrapper>
      <Link as={ as } href={ link } passHref>
        <Icon iconName={ text } size={ 30 } />
      </Link>
    </NavItemWrapper>
  )
}
