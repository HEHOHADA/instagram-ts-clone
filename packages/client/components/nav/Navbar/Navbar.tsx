import React from 'react'
import { Link } from '@/components/link/Link'
import { Search } from '@/components/search/Search'
import { LinkItem } from '@/components/utils/LinkItem'
import { useMeQuery } from '@instagram/common'
import { Logo } from '@/components/nav/Logo'
import { BoxCenter } from '@/components/common/Containers'
import { HeaderItems, NavContainer } from '@/components/nav/NavStyled'
import NavbarItems from '@/components/nav/NavbarItems/NavbarItems'

export const Navbar = () => {
  const { data, loading } = useMeQuery()

  return (
    <NavContainer>
      <HeaderItems>
        <div css='flex: 1 1 0;'>
          <Link>
            <Logo />
          </Link>
        </div>
        <Search />
        <BoxCenter>
          { !data || loading || !data.me ?
            <BoxCenter>
              <Link
                to='login' as='/'>
                <button className='nav__login'>
                  Войти
                </button>
              </Link>
              <LinkItem
                href='/accounts/register'
                as='/'
                linkClassName='nav__register'
                LinkContent='Зарегистрироваться' />
            </BoxCenter> : <NavbarItems
              username={ data.me.username }
              imageUrl={ data.me.pictureUrl } /> }
        </BoxCenter>
      </HeaderItems>
    </NavContainer>
  )
}
