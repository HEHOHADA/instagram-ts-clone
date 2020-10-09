import React, { useMemo, useState } from 'react'
import NavItem from './NavItem'
import { DropdownMenu } from './DropdownMenu'

type PropsType = {
  imageUrl: string | null | undefined
  username: string
}


const NavbarItems = ({imageUrl, username}: PropsType) => {
  const [isOpen, setIsOpen] = useState(() => false)


  const changeIsOpen = () => setIsOpen(!isOpen)

  const navItemArray = useMemo(() => {
    return [
      {link: '/', text: 'home'},
      {link: '/explore/', text: 'compass_calibration'},
      {as: '/direct/inbox', link: '/direct/[...slug]', text: 'comment'},
    ].map((n) => (
        <NavItem key={ n.text } { ...n } />
    ))
  }, [])

  return (
      <div className="nav__container">
        { navItemArray }
        <div className="nav__profile nav_item" onClick={ changeIsOpen }>
          { imageUrl ?
              <div className="image__item">
                <img alt="Грузит" src={ imageUrl }/>
              </div> :
              <a className="material-icons material">
                account_circle
              </a>
          }

          { isOpen && <DropdownMenu
              closeDropDown={ changeIsOpen }
              username={ username }/> }
        </div>
      </div>
  )
}

export default React.memo(NavbarItems)

