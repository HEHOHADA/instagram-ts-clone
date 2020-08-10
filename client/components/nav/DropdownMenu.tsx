import React, { useMemo } from 'react'
import { DropdownItem } from './DropdownItem'
import { MeDocument, MeQuery, useLogoutMutation } from '../../geterated/apollo'
import { useRouter } from 'next/router'

type PropsType = {
  username: string
}

export const DropdownMenu = ({username}: PropsType) => {

  const [logout] = useLogoutMutation()
  const router = useRouter()

  const dropDownMenu = useMemo(() => {
    return [
      {link: `/${ username }`, iconName: 'home', text: 'Профиль'},
      {link: '/accounts/settings', iconName: 'settings', text: 'Настройки'},
    ].map((n) => (
        <DropdownItem key={ n.text } { ...n } />
    ))
  }, [])

  return (
      <div className="dropdown">
        <div className="menu">
          { dropDownMenu }
          <hr/>
          <button onClick={ () => logout({
            update: async (cache, {data}) => {
              if (!data) {
                return
              }
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  me: null
                }
              })
              await router.push('/accounts/login')
            }
          }) } className="btn__logout">Выйти
          </button>
        </div>
      </div>
  )
}
