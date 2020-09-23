import React from 'react'
import { ModalRefType } from '../../hoc/ModalWindowContainer'
import { CloseModalButton } from './CloseModalButton'

export const SubscriptionModal = ({closeModal}: ModalRefType & { id?: string }) => {

  return (
      <>
        <div className="modal-window__subscription__header">
          <h1 className="modal-window__header__text">Подписчики</h1>
          <CloseModalButton closeModal={ closeModal }/>
        </div>

        <div className="modal-window__subscription__container">
          <ul className="subscription__items">
            <li className="subscription__item">
              <div className="subscription__item__container">
                <div className="subscription__user__info">
                  <div className="subscription__user__img">
                    <img
                        // src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/100871295_542918956381687_1284350690730180608_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=GvORhwuqOOYAX9_Tv0s&oh=b0d0b4bf4b680c799790e30c9b89df45&oe=5F5C4713"
                        alt="Фото"/>
                  </div>
                  <div className="subscription__username__container">
                    {/*<a className="subscription__username">anastasiya__shahova</a>*/ }
                    {/*<div className="subscription__full__name">Анастасия Шахова</div>*/ }
                  </div>
                </div>
                <div className="subscription__info__btn__container">
                  <button className="subscription__info__btn">Подписаться</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </>
  )
}
