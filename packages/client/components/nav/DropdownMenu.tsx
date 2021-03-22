import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'
import { setAccessToken } from '@/lib/token'
import { DropdownItem } from './DropdownItem'
import useDropdown from '@/hooks/useDropdown'
import { useLogoutMutation } from '@instagram/common'
import { DropDown } from '@/components/common/DropDown/DropDown'
import { MainButton } from '@/components/common/buttons'

type PropsType = {
  username: string
  closeDropDown: () => void
}

export const DropdownMenu: FC<PropsType> = ({ username, closeDropDown }) => {
  const { dropDownRef } = useDropdown(closeDropDown)
  const [logout] = useLogoutMutation()
  const router = useRouter()

  const dropDownMenu = useMemo(() => {
    return [
      {
        as: `/${ username }`,
        link: '/[username]',
        passHref: true,
        iconName: 'home',
        text: 'Профиль'
      },
      { link: '/accounts/settings', iconName: 'settings', text: 'Настройки' },
      { link: '/p/create', iconName: 'create', text: 'Создать пост' }
    ].map((n) => (
      <DropdownItem key={ n.text } { ...n } />
    ))
  }, [username])

  return (
    <DropDown ref={ dropDownRef }>
      { dropDownMenu }
      <hr />
      <MainButton
        onClick={ () => logout({
          update: async (cache, { data }) => {
            if (!data) {
              return
            }
            cache.reset()
            setAccessToken('')
            router.push('/accounts/login')
          }
        }) }>Выйти</MainButton>
    </DropDown>
  )
}
