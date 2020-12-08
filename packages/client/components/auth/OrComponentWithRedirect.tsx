import React from 'react'
import OrComponent from './OrComponent'
import { RedirectComponentType } from './RedirectComponent'
import { LinkItem } from '@/components/utils/LinkItem'

const OrComponentWithRedirect = ({link, text}: RedirectComponentType) => {
  return (
    <>
      <OrComponent/>
      <LinkItem
        href={ link }
        as="/"
        linkClassName="auth__forgot__password"
        LinkContent={ text }/>
    </>
  )
}


export default React.memo(OrComponentWithRedirect)
