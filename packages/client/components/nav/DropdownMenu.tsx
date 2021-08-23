import { useRouter } from 'next/router'
import React, { FC, RefObject, useMemo } from 'react'
import { setAccessToken } from '@/lib/token'
import { DropdownItem } from './DropdownItem'
import { useDropdown } from '@/hooks/useDropdown'
import { DropDown } from '@/components/common/DropDown/DropDown'
import { MainButton } from '@/components/common/buttons'
import { useLogoutMutation } from '@/geterated'

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
        iconName: 'home',
        text: 'Профиль'
      },
      { link: 'settings', iconName: 'settings', text: 'Настройки' },
      { link: 'create', iconName: 'create', text: 'Создать пост' }
    ].map((n) => (
      <DropdownItem key={ n.text } { ...n } />
    ))
  }, [username])

  return (
    <DropDown ref={ dropDownRef as RefObject<HTMLDivElement> }>
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
        }) } size='medium'>Выйти</MainButton>
    </DropDown>
  )
}
