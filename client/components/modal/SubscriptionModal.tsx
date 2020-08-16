import React, { useEffect } from 'react'

export const SubscriptionModal = ({onClick,onCloseOutside}: any) => {
  useEffect(() => {
    document.getElementById('modal-window-container')?.addEventListener('click', onCloseOutside)
    return()=>{
      document.getElementById('modal-window-container')?.removeEventListener('click', onCloseOutside)
    }
  }, [onClick])

  return (
      <>
        <div className="modal-window__subscription__header">
          <h1 className="modal-window__header__text">Подписчики</h1>
          <div className="modal-window__header__close">
            <button className="header__close" onClick={ onClick }>
              <svg aria-label="Закрыть"
                   fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path clipRule="evenodd"
                      d="M41.1 9.1l-15 15L41 39c.6.6.6 1.5 0 2.1s-1.5.6-2.1 0L24 26.1l-14.9 15c-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1l14.9-15-15-15c-.6-.6-.6-1.5 0-2.1s1.5-.6 2.1 0l15 15 15-15c.6-.6 1.5-.6 2.1 0 .6.6.6 1.6 0 2.2z"
                      fillRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-window__subscription__container">
          <ul className="subscription__items">
            <li className="subscription__item">
              <div className="subscription__item__container">
                <div className="subscription__user__info">
                  <div className="subscription__user__img">
                    <img
                        src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/100871295_542918956381687_1284350690730180608_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=GvORhwuqOOYAX9_Tv0s&oh=b0d0b4bf4b680c799790e30c9b89df45&oe=5F5C4713"
                        alt="Фото"/>
                  </div>
                  <div className="subscription__username__container">
                    <a className="subscription__username">anastasiya__shahova</a>
                    <div className="subscription__full__name">Анастасия Шахова</div>
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
