import React from 'react'
import { LinkItem } from '@/components/utils/LinkItem'

export type RedirectComponentType = {
  link: any
  text: string
}

const RedirectComponent = ({link, text}: RedirectComponentType) => {
  return (
    <div className="auth__change__page">
      <div className="change__page__container">
        <p className="change__page__items">
          <LinkItem
            linkClassName="change__link"
            href={ link }
            as="/"
            LinkContent={ text }/>
        </p>
      </div>
    </div>
  )
}

export default React.memo(RedirectComponent)
