import React from 'react'
import MainLayout from '../components/MainLayout'

export const Profile = () => {
  return (
      <MainLayout title="Profile">
        <div className="profile container">
          <div className="profile__info">
            <div className="profile__image">
              <div className="profile__image__center">
                <img
                    className="profile__img"
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/95942505_547262689269485_1395648643582656512_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=rTN8jjBYMNMAX-x74p7&oh=9b3723f799fc1412cccbca76fc5ff641&oe=5F3DF939"
                    alt=""/>
              </div>
            </div>
            <div className="profile__items">
              <div className="profile__item__header">
                <h2 className="profile__name">bulat</h2>
                <a className="profile__edit">Редиактировать пользователя</a>
                <a className="profile__settings">
                            <span className="material-icons">
                                settings
                            </span>
                </a>
              </div>
              <ul className="profile__item__info">
                <li className="profile__item">
                  <span className="profile__count__photo">3</span>
                  <span className="profile__text__photo">публикации</span>
                </li>
                <li className="profile__item">
                  <span className="profile__count__photo">62</span>
                  <span className="profile__text__photo">подпискичка</span>
                </li>
                <li className="profile__item">
                  <span className="profile__count__photo">25</span>
                  <span className="profile__text__photo">подписокы</span>
                </li>
              </ul>
              <div className="profile__item__name">Bulat</div>
            </div>
          </div>

          <hr/>
          <div className="profile__objects">
            <div className="profile__objects__lin">
              <div className="object__item active">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
              <div className="object__item">Публикация</div>
            </div>
          </div>

          <div className="profile__photos">
            <div className="profile__photo__container">
              <img
                  className="profile__photo"
                  src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/83239681_620561308771120_905890002189152404_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&amp;_nc_cat=104&amp;_nc_ohc=Zr7K4wAQIFsAX-fx-YQ&amp;oh=594bf2e10ed5283a1c7d1e889f82376d&amp;oe=5F3ACA6F"
              />
            </div>
            <div className="profile__photo__container">
              <img
                  className="profile__photo"
                  src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/83239681_620561308771120_905890002189152404_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&amp;_nc_cat=104&amp;_nc_ohc=Zr7K4wAQIFsAX-fx-YQ&amp;oh=594bf2e10ed5283a1c7d1e889f82376d&amp;oe=5F3ACA6F"
              />
            </div>
            <div className="profile__photo__container">
              <img
                  className="profile__photo"
                  src="https://scontent-frt3-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/83239681_620561308771120_905890002189152404_n.jpg?_nc_ht=scontent-frt3-1.cdninstagram.com&amp;_nc_cat=104&amp;_nc_ohc=Zr7K4wAQIFsAX-fx-YQ&amp;oh=594bf2e10ed5283a1c7d1e889f82376d&amp;oe=5F3ACA6F"
              />
            </div>

          </div>

        </div>
      </MainLayout>
  )
}


export default Profile
