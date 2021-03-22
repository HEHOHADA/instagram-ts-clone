import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '@/components/nav/Navbar'

type Props = {
  title?: string
}

const MainLayout: FC<Props> = ({ children, title = 'Main' }) => {
  return (
    <>
      <Head>
        <title>{ title } | Instagram</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main' role='main'>
        { children }
      </main>
      <footer>
        <h2>ladsldasl</h2>
      </footer>
    </>
  )
}

export default MainLayout
