import React, { FC } from 'react'

export const RecommendationItems:FC = () => {
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
              <img
                  alt="Фото профиля dilyaravl"
                  src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/102266003_2974769402619790_6785781755961355718_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=N53qFP8962cAX_wDUo5&oh=1b86b8b13fceb0f16d02be176e8c9e8c&oe=5FAA91D5"/>
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
              <img
                  alt="Фото профиля dilyaravl"
                  src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/102266003_2974769402619790_6785781755961355718_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=N53qFP8962cAX_wDUo5&oh=1b86b8b13fceb0f16d02be176e8c9e8c&oe=5FAA91D5"/>
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
