import React from 'react'

type PropsType = {
  count: number
  text: string
  onClick?: () => void
}

export const ProfileInfoItem = React.memo(({count, text, onClick}: PropsType) => {
  return (
      <li className="profile__item"
          style={ {cursor: onClick ? 'pointer' : 'text'} }
          onClick={ onClick }>
        <span className="profile__count__photo">{ count }</span>
        <span className="profile__text__photo">{ text }</span>
      </li>
  )
})
