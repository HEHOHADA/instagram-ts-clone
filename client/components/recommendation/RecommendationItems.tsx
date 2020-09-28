import React from 'react'

export const RecommendationItems = () => {
  return (
      <div className="dashboard__recommendation__items">
        <div className="recommend__helper">
          <span className="recommend__for__you">
              Рекомендации для вас
          </span>
          <a className="recommend__all">Все</a>
        </div>
        <ul className="recommendations">
          <li className="recommend__item">
            <div className="recommend__img">
              <img alt="Фото профиля dimasik33junior" className="_6q-tv" data-testid="user-avatar"
                   draggable="false"
                   src=""/>
            </div>
            <div className="recommend__info">
              <a className="recommend__username">dima</a>
              <div className="recommend__name">Dima</div>
              <div className="recommend__info__item">Подписчки</div>
            </div>
            <button className="recommend__sub">Подписаться</button>
          </li>
          <li className="recommend__item">
            <div className="recommend__img">
              <img alt="Фото профиля dimasik33junior" className="_6q-tv" data-testid="user-avatar"
                   draggable="false"
                   src=""/>
            </div>
            <div className="recommend__info">
              <a className="recommend__username">dima</a>
              <div className="recommend__name">Dima</div>
              <div className="recommend__info__item">Подписчки</div>
            </div>
            <button className="recommend__sub">Подписаться</button>
          </li>
        </ul>
      </div>
  )
}
