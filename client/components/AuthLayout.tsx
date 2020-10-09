import Head from 'next/head'
import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  title?: string
}

const AuthLayout = ({children, title = 'Instagram'}: Props) => (
    <div>
      <Head>
        <title>{ title } | Auth</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
      </Head>
      <main className="auth__main" role="main">
        <article className="auth__layout">
          <div className="content__phone"/>
          { children }
        </article>
      </main>
      <footer>
        <footer className="footer">
          <div className="container">
            <nav className="footer__nav">
              <ul className="footer__nav__items">
                <li className="footer__nav__item"/>
              </ul>
            </nav>
            <span className="footer__nav__name">
                Instagram от HEHOHADA
            </span>
          </div>
        </footer>
      </footer>
    </div>
)

export default AuthLayout
