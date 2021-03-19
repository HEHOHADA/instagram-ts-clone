import React, { FC } from 'react'
import Link from 'next/link'

type PropsType = {
  as?: string
  href: string
  passHref?: boolean
  linkClassName?: string
  LinkContent: string | JSX.Element
}

export const LinkItem: FC<PropsType> =
  ({as, href, passHref = false, linkClassName, LinkContent}) => {
    return (
      <Link passHref={ passHref } as={ as } href={ href }>
        <a className={ linkClassName }>
          { LinkContent }
        </a>
      </Link>
    )
  }
