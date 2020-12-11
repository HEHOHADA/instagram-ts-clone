import Link from 'next/link'
import Head from 'next/head'
import React, { ReactNode } from 'react'

import { useMeQuery } from '@instagram/common'

import NavbarItems from './nav/NavbarItems'
import { SearchComponent } from './search/SearchComponent'
import { LinkItem } from '@/components/utils/LinkItem'

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
                  <LinkItem
                    linkClassName={ '"nav__register"' }
                    href="/accounts/login" as="/"
                    LinkContent={
                      (<button className="nav__login">
                        Войти
                      </button>)
                    }/>
                  <LinkItem
                    href="/accounts/register"
                    as="/"
                    linkClassName="nav__register"
                    LinkContent={ 'Зарегистрироваться' }/>
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
