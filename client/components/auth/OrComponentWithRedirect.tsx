import React from 'react'
import Link from 'next/link'
import OrComponent from './OrComponent'
import { RedirectComponentType } from './RedirectComponent'

const OrComponentWithRedirect = ({link, text}: RedirectComponentType) => {
  return (
      <>
        <OrComponent/>
        <Link href={ link } as="/">
          <a className="auth__forgot__password">{ text }</a>
        </Link>
      </>
  )
}


export default React.memo(OrComponentWithRedirect)
