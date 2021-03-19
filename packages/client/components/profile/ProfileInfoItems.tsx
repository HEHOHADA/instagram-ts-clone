import React, { useMemo } from 'react'
import { ProfileInfoItem } from './ProfileInfoItem'
import { ProfileItemsType } from '@/pages/[username]'

type PropsType = {
  navItems: Array<ProfileItemsType>
}

const ProfileInfoItems = ({navItems}: PropsType) => {

  const renderInfoItems = useMemo(() => {
    return (
        navItems.map((item, i) =>
            <ProfileInfoItem key={ item.text + i }{ ...item }/>
        )
    )
  }, [navItems])

  return (
      <ul className="profile__item__info">
        { renderInfoItems }
      </ul>)
}

export default React.memo(ProfileInfoItems)
