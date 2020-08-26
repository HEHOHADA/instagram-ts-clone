import React, { useCallback, useState } from 'react'
import MainLayout from '../../components/MainLayout'
import { MyContext } from '../../interfaces/MyContext'
import { MeDocument, MeQuery, useSetPictureProfileMutation } from '../../geterated/apollo'
import { DropzonePictureProfile } from '../../components/utils/DropzoneField'


type UserInfoPropsType = {
  userInfo: {
    username: string
    id: string
    pictureUrl: string | null
    email: string
  }
}

const Settings = ({userInfo}: UserInfoPropsType) => {

  const [setPicture] = useSetPictureProfileMutation()
  const [pictureUrl, setPictureUrl] = useState(userInfo.pictureUrl)
  const changePictureHandler = useCallback(async ([picture]) => {
    await setPicture({
      variables: {
        picture
      },
      update: (cache, {data}) => {
        const meData = cache.readQuery<MeQuery>({query: MeDocument})
        if (meData?.me) {
          let picture = meData.me.pictureUrl?.split('/')
          if (picture) {
            picture.pop()
            picture.push(data?.setPictureProfile!)
            const pictureUrlCache = picture.join('/')
            setPictureUrl(pictureUrlCache)
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: {me: {...meData.me, pictureUrl: pictureUrlCache ?? meData.me?.pictureUrl}}
            })
          }
        }
      }
    })

  }, [pictureUrl, setPicture])

  return (
      <MainLayout title="Settings">
        <div className="settings__container">
          <ul className="settings__side-bar">
            <li>
              <a className="side-bar__item">dasdas</a>
            </li>
            <li>
              <a className="side-bar__item">dasdas</a>
            </li>
            <li>
              <a className="side-bar__item">dasdas</a>
            </li>
            <li>
              <a className="side-bar__item">dasdas</a>
            </li>
          </ul>
          <article className="settings__main">
            <div className="user__picture__container">
              <div className="user__url">
                <img
                    src={ pictureUrl ?? userInfo.pictureUrl ?? '' } alt=""/>
              </div>
              <div className="user__change-picture">
                <div className="username">{ userInfo.username }</div>
                <DropzonePictureProfile
                    text={ 'Сменить фото' }
                    onDrop={ changePictureHandler }
                    className="change-picture"/>
              </div>
            </div>
            <form className="settings__change-info">
              <div className="change__item__container">
                <div className="change__name">Имя</div>
                <div className="change__input__container">
                  <input placeholder="Введите иия" type="text" className="input__field"/>
                  <div className="change__input__info">
                    Чтобы людям было проще находить ваш аккаунт, используйте имя, под которым вас знают: ваше имя и
                    фамилию, никнейм или название компании.
                    Изменить имя можно не более двух раз в течение 14 дней.
                  </div>
                </div>
              </div>
              <div className="form__settings__submit">
                <button className="send__form">Отправить</button>
                <button className="block__account">Заблокировать аккаунт</button>
              </div>
            </form>
          </article>
        </div>
      </MainLayout>
  )
}

//
// Settings.getInitialProps = async (ctx: MyContext) => {
//
//   let meDataQuery: MeQuery | null = ctx.apolloClient.cache.readQuery({query: MeDocument})
//   if (!meDataQuery) {
//     meDataQuery = (await ctx.apolloClient.query({
//       query: MeDocument
//     })).data
//   }
//   const {__typename, ...me} = meDataQuery?.me ?? {}
//   return {
//     userInfo: {...me} as UserInfoPropsType
//   }
// }

export default Settings
