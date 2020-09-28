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
                    alt="Фото профиля li_light_" className="history__img" data-testid="user-avatar"
                    draggable="false"
                    src=""/>
              </div>
              <div className="history__username">li_light_</div>
            </li>
            <li className="dashboard__item">
              <div className="history__image">
                <img

                    alt="Фото профиля li_light_" className="history__img" data-testid="user-avatar"
                    draggable="false"
                    src=""/>
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
