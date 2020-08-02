import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const MainLayout = ({children, title = 'Main'}: Props) => (
    <>
      <Head>
        <title>{ title } | Instagram</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <header>
        <nav className="header">
          <div className="header__items container">
            <div className="header__logo">&nbsp;</div>
            <div className="header__search">
              <input type="text" placeholder="Search" className="header__searchInput"/>
              <button className="header__searchButton">
                <i className="material-icons">
                  search
                </i>
              </button>
            </div>
            <div className="header__nav-items">
              <div className="nav__container">
                <div className="nav__home nav_item">
                        <span className="material-icons">
                            home
                        </span>
                </div>
                <div className="nav__direct nav_item">
                        <span className="material-icons">
                            comment
                        </span>
                </div>
                <div className="nav__recommend nav_item">
                        <span className="material-icons">
                            compass_calibration
                        </span>
                </div>
                <div className="nav__profile nav_item">
                        <span className="material-icons">
                            account_circle
                        </span>
                  <div className="dropdown">
                    <div className="menu">
                      <a href="#" className="menu__item"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main className="main" role="main">
        { children }
      </main>
      <footer>
        <h1>ladsldasl</h1>
      </footer>
    </>
)

export default MainLayout
