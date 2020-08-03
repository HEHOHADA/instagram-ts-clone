import React from 'react'
import Link from 'next/link'

const NavbarItems = () => {
  return (
      <div className="nav__container">
        <div className="nav__home nav_item">
          <Link href="/">
              <a className="material-icons">
                  home
              </a>
          </Link>
        </div>
        <div className="nav__direct nav_item">
          <Link href="/direct/inbox">
              <a className="material-icons">
                  comment
              </a>
          </Link>
        </div>
        <div className="nav__recommend nav_item">
          <Link href="/explore">
              <a className="material-icons">
                  compass_calibration
              </a>
          </Link>
        </div>
        <div className="nav__profile nav_item">
          <a className="material-icons">
              account_circle
          </a>
          <div className="dropdown">
            <div className="menu">
              <a href="#" className="menu__item"/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default React.memo(NavbarItems)
