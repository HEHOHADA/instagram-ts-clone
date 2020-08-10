import React from 'react'
import Link from 'next/link'

export type RedirectComponentType = {
  link: string
  text: string
}

const RedirectComponent = ({link, text}: RedirectComponentType) => {
  return (
      <div className="auth__change__page">
        <div className="change__page__container">
          <p className="change__page__items">
            <Link href={ link }>
              <a className="change__link">{ text }</a>
            </Link>
          </p>
        </div>
      </div>
  )
}

export default React.memo(RedirectComponent)
