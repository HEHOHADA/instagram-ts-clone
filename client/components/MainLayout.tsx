import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useMeQuery } from '../geterated/apollo'
import NavbarItems from './nav/NavbarItems'
import { SearchComponent } from './search/SearchComponent'

type Props = {
  children?: ReactNode
  title?: string
}

const MainLayout = ({children, title = 'Main'}: Props) => {
  const {data, loading} = useMeQuery()
  return (
      <>
        <Head>
          <title>{ title } | Instagram</title>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <header>
          <nav className="header">
            <div className="header__items">
              <Link href="/">
                <a className="header__logo">&nbsp;</a>
              </Link>
              <SearchComponent/>
              <div className="header__nav-items">
                { !data || loading || !data.me ?
                    <div className="nav__container">
                      <Link href="/accounts/login" as="/">
                        <a className="nav__register">
                          <button className="nav__login">
                            Войти
                          </button>
                        </a>
                      </Link>
                      <Link href="/accounts/register" as="/">
                        <a className="nav__register">Зарегистрироваться</a>
                      </Link>
                    </div> : <NavbarItems
                        username={ data.me.username }
                        imageUrl={ data.me.pictureUrl }/> }
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
}

export default MainLayout
