import React from 'react'
import OrComponent from './OrComponent'
import Link from 'next/link'
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
