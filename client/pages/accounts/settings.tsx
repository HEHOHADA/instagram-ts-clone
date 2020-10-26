import React, { useCallback } from 'react'
import { NextPageContext } from 'next'

import Redirect from '@/lib/redirect'
import withApollo from '@/lib/withApollo'
import MainLayout from '@/components/MainLayout'
import { getCookieParser } from 'next/dist/next-server/server/api-utils'
import { DropzonePictureProfile } from '@/components/utils/DropzoneField'
import { useMeQuery, useSetPictureProfileMutation } from '@/geterated/apollo'
import Loading from '@/components/utils/Loading'
import { useIsAuth } from '@/utils/useIsAuth'
import { SettingsSidebar } from '@/components/settings/SettingsSidebar'
import { SettingsEditForm } from '@/components/settings/edit/SettingsEditForm'

const Settings = () => {
  useIsAuth()
  const {data} = useMeQuery()
  const [setPicture] = useSetPictureProfileMutation()

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
          <SettingsSidebar/>
          <article className="settings__main">
            <div className="user__picture__container">
              { data ?
                  <>
                    <div className="user__url">
                      { data.me?.pictureUrl && <img
                          src={ data.me.pictureUrl } alt=""/> }
                    </div>
                    <div className="user__change-picture">
                      <div className="username">{ data.me!.username }</div>
                      <DropzonePictureProfile
                          text={ 'Сменить фото' }
                          onDrop={ changePictureHandler }
                          className="change-picture"/>
                    </div>
                  </>
                  : <Loading/>
              }
            </div>
           <SettingsEditForm />
          </article>
        </div>
      </MainLayout>
  )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  if (ctx.req) {
    const jid = getCookieParser(ctx.req)
    if (!jid()['jid']) {
      Redirect(ctx, '/accounts/login')
    }
  }
  return {
    props: {}
  }
}

export default withApollo({ssr: false})(Settings)

