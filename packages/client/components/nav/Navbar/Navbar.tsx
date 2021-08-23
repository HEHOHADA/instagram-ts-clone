import React, { FC } from 'react'
import { Link } from '@/components/link/Link'
import { Search } from '@/components/search/Search'
import { Logo } from '@/components/nav/Logo'
import { BoxCenter } from '@/components/common/Containers'
import { HeaderItems, NavContainer } from '@/components/nav/NavStyled'
import NavbarItems from '@/components/nav/NavbarItems/NavbarItems'
import { MainButton, SecondaryButton } from '@/components/common/buttons'
import { useMeQuery } from '@/geterated'

export const Navbar: FC = () => {
  const { data, loading } = useMeQuery()

  return (
    <NavContainer>
      <HeaderItems>
        <div css='flex: 1 1 0;'>
          <Link to='home'>
            <Logo />
          </Link>
        </div>
        <Search />
        <BoxCenter>
          { !data || loading || !data.me ?
            <BoxCenter>
              <Link to='login' as='/'>
                <MainButton size='medium'>
                  Войти
                </MainButton>
              </Link>
              <Link to='register' as='/'>
                <SecondaryButton size='medium'>
                  Зарегистрироваться
                </SecondaryButton>
              </Link>
            </BoxCenter> :
            <NavbarItems
              username={ data.me.username }
              imageUrl={ data.me.pictureUrl } /> }
        </BoxCenter>
      </HeaderItems>
    </NavContainer>
  )
}
