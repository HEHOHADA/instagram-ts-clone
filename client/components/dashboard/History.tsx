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
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/65056898_419906642070027_8197794989724401664_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=lju2jx8-FFYAX-wmnhb&amp;oh=f5b5711f38f6e094fc4b91f91bfc499e&amp;oe=5F3E9BF9"/>
              </div>
              <div className="history__username">li_light_</div>
            </li>
            <li className="dashboard__item">
              <div className="history__image">
                <img

                    alt="Фото профиля li_light_" className="history__img" data-testid="user-avatar"
                    draggable="false"
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/65056898_419906642070027_8197794989724401664_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=lju2jx8-FFYAX-wmnhb&amp;oh=f5b5711f38f6e094fc4b91f91bfc499e&amp;oe=5F3E9BF9"/>
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
