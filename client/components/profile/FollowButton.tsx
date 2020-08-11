import React from 'react'

type PropsType = {
  onClick: () => void
  text: string
  className: string
}

export const FollowButton = React.memo(({onClick, text, className}: PropsType) => {
  return (
      <button className={ className }
              onClick={ onClick }>{ text }</button>
  )
})
