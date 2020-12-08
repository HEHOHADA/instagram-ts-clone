import React, { FC } from 'react'
import { RedirectComponentType } from '../auth/RedirectComponent'
import { LinkItem } from '@/components/utils/LinkItem'


export type LinkRedirectComponentType = {
  iconName: string,
  as?: string,
  passHref?: boolean
}

type PropsType = LinkRedirectComponentType & RedirectComponentType

export const DropdownItem: FC<PropsType> = ({text, link, as, iconName, passHref}) => {

  const LinkContent = (
    <>
      <span className="material-icons">
        { iconName }
      </span>
      { text }
    </>
  )

  return (
    <LinkItem
      passHref={ passHref }
      as={ as } href={ link } linkClassName={ 'menu-item' }
      LinkContent={ LinkContent }/>
  )
}
