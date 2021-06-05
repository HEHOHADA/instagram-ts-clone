import React, { useMemo, useState } from 'react'
import { NavItem } from '@/components/nav/NavItem'

import { DropdownMenu } from '@/components/nav/DropdownMenu'
import { BoxCenter } from '@/components/common/Containers'
import { ImageWrapper, NavItemWrapper } from './NavbarItemStyled'
import { Icon } from '@/components/icons'

type PropsType = {
  imageUrl: string | null | undefined
  username: string
}

const NavbarItems = ({ imageUrl, username }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false)

  const changeIsOpen = () => setIsOpen(prev => !prev)

  const navItemArray = useMemo(() => {
    return [
      { link: '/', text: 'home' },
      { link: '/explore/', text: 'compass_calibration' },
      { as: '/direct/inbox', link: '/direct/[...slug]', text: 'comment' }
    ].map((n) => (
      <NavItem key={ n.text } { ...n } />
    ))
  }, [])

  return (
    <BoxCenter>
      { navItemArray }
      <NavItemWrapper onClick={ e => {
        e.stopPropagation()
        changeIsOpen()
      } }>
        { imageUrl ?
          <ImageWrapper $height={ 40 } pointer>
            <img alt='Грузит' src={ imageUrl } />
          </ImageWrapper> :
          <Icon iconName=' account_circle' />
        }
        { isOpen && <DropdownMenu
          closeDropDown={ changeIsOpen }
          username={ username } /> }
      </NavItemWrapper>
    </BoxCenter>
  )
}

export default React.memo(NavbarItems)

