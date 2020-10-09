import React, { useCallback } from 'react'
import { NextPageContext } from 'next'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'
import { DropzonePictureProfile } from '@/components/utils/DropzoneField'
import { useMeQuery, useSetPictureProfileMutation } from '@/geterated/apollo'
import Loading from '@/components/utils/Loading'

const Settings = () => {

  const [setPicture] = useSetPictureProfileMutation()
  const {data} = useMeQuery()

  const changePictureHandler = useCallback(async ([picture]) => {
    await setPicture({
      variables: {
        picture
      },
      update: (cache) => {
        cache.evict({id: `User:${ data?.me?.id }`})
      }
    })

  }, [setPicture])

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
              { data ?
                  <>
                    <div className="user__url">
                      { data.me?.pictureUrl && <img
                          src={ data.me.pictureUrl } alt=""/> }
                    </div>
                    <div className="user__change-picture">
                      <div className="username">{ data.me?.username }</div>
                      <DropzonePictureProfile
                          text={ 'Сменить фото' }
                          onDrop={ changePictureHandler }
                          className="change-picture"/>
                    </div>
                  </>
                  : <Loading/>
              }
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
                <button type='submit' className="send__form">Отправить</button>
                <button className="block__account">Заблокировать аккаунт</button>
              </div>
            </form>
          </article>
        </div>
      </MainLayout>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  if (ctx.req) {
    const jid = getCookieParser(ctx.req)
    if (jid()['jid']) {
      Redirect(ctx, '/')
    }
  }
  return {
    props: {}
  }
}

export default withApollo({ssr: false})(Settings)

