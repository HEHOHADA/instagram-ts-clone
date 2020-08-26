import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { DropdownItem } from './DropdownItem'
import { useLogoutMutation } from '../../geterated/apollo'
import { useRouter } from 'next/router'

type PropsType = {
  username: string
  closeDropDown: () => void
}

export const DropdownMenu = ({username, closeDropDown}: PropsType) => {

  const [logout] = useLogoutMutation()
  const dropDownRef = useRef(null)
  const router = useRouter()

  const closeOutside = useCallback((e: MouseEvent) => {
    if (dropDownRef?.current && !((dropDownRef.current! as HTMLDivElement).contains(e.target as HTMLDivElement))) {
      closeDropDown()
    }
  }, [closeDropDown, dropDownRef])

  useEffect(() => {
    document.addEventListener('click', closeOutside)
    return () => {
      closeDropDown()
      document.removeEventListener('click', closeOutside)
    }
  }, [closeDropDown])

  const dropDownMenu = useMemo(() => {
    return [
      {link: `/${ username }`, as:`/[username]`,iconName: 'home', text: 'Профиль'},
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
              await cache.reset()
              await router.push('/accounts/login')
            }
          }) } className="btn__logout">Выйти
          </button>
        </div>
      </div>
  )
}
