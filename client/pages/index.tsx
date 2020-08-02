import React from 'react'
import MainLayout from '../components/MainLayout'

const IndexPage = () => (
    <MainLayout title="Home | Instagram">
      <div className="container dashboard">
        <div className="dashboard__main">
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
          <div>
            <div className="dashboard__content">
              <header className="dashboard__content__header">
                <div className="content__header_img">
                  <img className="content__header_image"
                       src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/91669523_629828947608438_3894097914997243904_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=Xvhwb-jVAy4AX8FS-V5&oh=2e817aa6c82aed3f0ae95720bc63099c&oe=5F3C760C"
                       alt=""/>
                </div>
                <div className="content__header__name">anna</div>
                <div className="content__header__options">
                            <span className="material-icons">
                                more_horiz
                            </span>
                </div>
              </header>
              <div className="content__img">
                <img
                    className="content__img__item" sizes="610px"
                    src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/110022819_3302241179835401_4807377884948533610_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_cat=105&amp;_nc_ohc=Dg9VLpCzGtMAX9FzBcQ&amp;oh=9bd45d9daf33cae165b766bdbeea319f&amp;oe=5F3C1BE4"
                />
              </div>

              <div className="content__tools">
                <div className="content__tools__options">
                  <div className="tool">
                                <span className="material-icons">
                                    favorite
                                </span>

                  </div>
                  <div className="tool">
                                <span className="material-icons">
                                    forum
                                </span>

                  </div>
                  <div className="tool">
                                 <span className="material-icons">
                                      comment
                                 </span>
                  </div>
                  <div className="tool__save">
                                <span className="material-icons">
                                    save_alt
                                </span>
                  </div>
                </div>

                <div className="content__likes">
                  <span>Нравится 42 людям</span>
                </div>
                <div className="content__comments">
                  <ul>
                    <li className="comment__item">
                      <span className="comment__username">anna</span>
                      <p className="comment__text">hello</p>
                    </li>
                    <li className="comment__item">
                      <span className="comment__username">vika</span>
                      <p className="comment__text">hi</p>
                    </li>
                  </ul>
                </div>
                <div className="content__created">28 часв назад</div>
                <form className="comment__create">
                  <textarea placeholder="Введите комментарий" className="comment__add"/>
                  <button className="comment__btn">Отправить</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__recommendation">
          <div className="user__profile">
            <div className="user__img">
              <img alt="Фото профиля bulat.khai" className="_6q-tv" data-testid="user-avatar" draggable="false"
                   src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/95942505_547262689269485_1395648643582656512_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=rU5cQDYydn4AX-C34rA&amp;oh=bedd301682e45387a29d122f5d55977f&amp;oe=5F3DF939"/>
            </div>
            <div className="user__info">
              <div className="user__username">bualt</div>
              <div className="user__name">Bualt</div>
            </div>
          </div>
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
                       src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/89261045_525025175100883_7575808430191935488_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=bA628poa9SUAX-_rpAq&amp;oh=247e871a40b851ff0c961e04965c782d&amp;oe=5F3E8BC9"/>
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
                       src="https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/89261045_525025175100883_7575808430191935488_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&amp;_nc_ohc=bA628poa9SUAX-_rpAq&amp;oh=247e871a40b851ff0c961e04965c782d&amp;oe=5F3E8BC9"/>
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
        </div>
      </div>
    </MainLayout>
)


// export async function getServerSideProps(context: MyContext) {
//   console.log(context)
//   return {
//     props: {a: 1}
//   }
// }

// IndexPage.getInitialProps = async (context: MyContext) => {
//   console.log(context)
//   return {}
// }


export default IndexPage
