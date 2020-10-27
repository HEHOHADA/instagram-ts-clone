import React, { FC } from 'react'
import { RedirectComponentType } from '../auth/RedirectComponent'
import Link from 'next/link'


export type LinkRedirectComponentType = {
  iconName: string,
  as?: string,
  passHref?: boolean
}

type PropsType = LinkRedirectComponentType & RedirectComponentType

export const DropdownItem: FC<PropsType> = ({text, link, as, iconName, passHref}) => {
  return (
    <Link passHref={ passHref } as={ as } href={ link }>
      <a className="menu-item">
            <span className="material-icons">
              { iconName }
            </span>
        { text }
      </a>
    </Link>
  )
}
