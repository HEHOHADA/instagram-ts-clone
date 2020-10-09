import React from 'react'
import Link from 'next/link'
import { RedirectComponentType } from '../auth/RedirectComponent'

const NavItem = ({link,as, text}: RedirectComponentType & { as?: string }) => {
  return (
      <div className="nav__home nav_item">
        <Link as={as} href={ link }>
          <a style={ {fontSize: 30} } className="material-icons">
            { text }
          </a>
        </Link>
      </div>
  )
}

export default React.memo(NavItem)
