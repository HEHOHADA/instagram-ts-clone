import React from 'react'

export const History = () => {
  return (
      <div className="dashboard__history">
        <div className="dashboard__history__container">
          <button className="history__btn__left">
            <span className="material-icons">
                keyboard_arrow_left
            </span>
          </button>
          <ul className="dashboard__item__container">
            <li className="dashboard__item">
              <div className="history__image">
                <img
                    alt="Фото профиля dilyaravl"
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/102266003_2974769402619790_6785781755961355718_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=N53qFP8962cAX_wDUo5&oh=1b86b8b13fceb0f16d02be176e8c9e8c&oe=5FAA91D5"/>
              </div>
              <div className="history__username">li_light_</div>
            </li> <li className="dashboard__item">
              <div className="history__image">
                <img
                    alt="Фото профиля dilyaravl"
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/102266003_2974769402619790_6785781755961355718_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=N53qFP8962cAX_wDUo5&oh=1b86b8b13fceb0f16d02be176e8c9e8c&oe=5FAA91D5"/>
              </div>
              <div className="history__username">li_light_</div>
            </li>
          </ul>
          <button className="history__btn__right">
            <span className="material-icons">
                keyboard_arrow_right
            </span>
          </button>
        </div>
      </div>
  )
}
