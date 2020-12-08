import React from 'react'

type PropsType = {
  onClick?: () => void
  text: string | JSX.Element
  className: string
}

export const Button = React.memo(({onClick, text, className}: PropsType) => {
  return (
    <button className={ className }
            onClick={ onClick }>{ text }</button>
  )
})
