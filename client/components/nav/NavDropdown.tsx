import React from 'react'

export const NavDropdown = () => {
  return (
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
  )
}
