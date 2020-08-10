import React from 'react'

type PropsType = {
  count: number
  text: string
}

export const ProfileInfoItem = React.memo(({count, text}: PropsType) => {
  return (
      <li className="profile__item">
        <span className="profile__count__photo">{ count }</span>
        <span className="profile__text__photo">{ text }</span>
      </li>
  )
})
