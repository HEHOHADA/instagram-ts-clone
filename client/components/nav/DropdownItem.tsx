import React from 'react'
import { RedirectComponentType } from '../auth/RedirectComponent'
import Link from 'next/link'

export const DropdownItem = ({text, link, iconName}: RedirectComponentType & { iconName: string, as?: string }) => {
  return (
      <Link href={ link }>
        <a className="menu-item">
            <span className="material-icons">
              { iconName }
            </span>
          { text }
        </a>
      </Link>
  )
}
