import React, { ButtonHTMLAttributes } from 'react'

type PropsType = {
  onClick?: () => void
  text: string | JSX.Element
  className: string
}

export const Button = React.memo(({onClick, text, className,...props}: PropsType& ButtonHTMLAttributes<{}>) => {
  return (
    <button className={ className }
            onClick={ onClick } {...props}>{ text }</button>
  )
})
