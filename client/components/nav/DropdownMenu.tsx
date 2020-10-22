import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { setAccessToken } from '@/lib/token'
import { DropdownItem } from './DropdownItem'
import useDropdown from '@/hooks/useDropdown'
import { useLogoutMutation } from '@/geterated/apollo'

type PropsType = {
  username: string
  closeDropDown: () => void
}

export const DropdownMenu = ({username, closeDropDown}: PropsType) => {
  const {dropDownRef} = useDropdown(closeDropDown)
  const [logout] = useLogoutMutation()
  const router = useRouter()

  const dropDownMenu = useMemo(() => {
    return [
      {as: `/${ username }`, link: '/[username]', passHref: true, iconName: 'home', text: 'Профиль'},
      {link: '/accounts/settings', iconName: 'settings', text: 'Настройки'},
      {link: '/p/create', iconName: 'create', text: 'Создать пост'}
    ].map((n) => (
        <DropdownItem key={ n.text } { ...n } />
    ))
  }, [])

  return (
      <div className="dropdown" ref={ dropDownRef }>
        <div className="menu">
          { dropDownMenu }
          <hr/>
          <button onClick={ () => logout({
            update: async (cache, {data}) => {
              if (!data) {
                return
              }
              cache.reset()
              setAccessToken('')
              router.push('/accounts/login')
            }
          }) } className="btn__logout">Выйти
          </button>
        </div>
      </div>
  )
}
