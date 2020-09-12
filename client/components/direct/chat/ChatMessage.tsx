import React, { FC } from 'react'

type PropsType = {
  pictureUrl?: string | null
  isAuthor: boolean
  text: string
  date?: string
}
export const ChatMessage: FC<PropsType> = ({
                                             pictureUrl,
                                             isAuthor,
                                             text,
                                             date
                                           }) => {
  return (
      <>
        <div className="conversation__date">
          { date && new Date(parseInt(date)).toLocaleDateString() }
        </div>
        <div className={ `message__container ${ isAuthor ? 'message__container__left' : '' }` }>
          <div className="message__user__image">
            { pictureUrl && !isAuthor && <img src={ pictureUrl! } alt={ 'Грузит' }/> }
          </div>
          <div className={ `message__text__container ${ isAuthor ? 'message__text-color' : '' }` }>
            <div className="message__text">{ text }</div>
          </div>
        </div>
      </>)
}
