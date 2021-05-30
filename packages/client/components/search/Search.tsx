import React, { useEffect, useState } from 'react'

import { useDropdown } from '@/hooks/useDropdown'

import useDebounce from '@/hooks/useDebounce'
import { Button } from '@/components/utils/Button'
import { useSearchLazyQuery } from '@instagram/common'
import { Icon } from '@/components/common/icons/Icon'
import { UserLink } from '../link/UserLink'
import {
  HeaderSearch,
  SearchButton,
  SearchDropDown,
  SearchDropDownLink,
  SearchInput
} from './SearchStyled'

export const Search = () => {
  const { dropDownRef, isOpen, open } = useDropdown<HTMLDivElement>()
  const [searchString, setSearchString] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchString, 500)
  const [loadSearch, { called, loading, data, variables, fetchMore }] = useSearchLazyQuery({
    variables: {
      subString: debouncedSearchTerm,
      limit: 1,
      cursor: null as null | string
    }
  })

  const onFetchMore = async () => {
    fetchMore && called && await fetchMore({
      variables: {
        limit: variables!.limit,
        cursor: variables!.cursor,
        subString: debouncedSearchTerm
      }
    })
  }

  useEffect(() => {
      if (debouncedSearchTerm) {
        loadSearch()
        !isOpen && open()
      }
    },
    [debouncedSearchTerm, isOpen, open, loadSearch]
  )

  return (
    <HeaderSearch>
      <SearchInput
        value={ searchString }
        onChange={ (e) => setSearchString(e.target.value) }
        type='text' placeholder='Search' />
      <SearchButton round onClick={ onFetchMore }>
        <Icon iconName={ 'search' } />
      </SearchButton>
      { isOpen && called && data && !loading &&
      <SearchDropDown ref={ dropDownRef }>
        { data.search.items.map(user => (
          <UserLink
            key={ user.id }
            username={ user.username }>
            <SearchDropDownLink>
              { user.username }
            </SearchDropDownLink>
          </UserLink>
        )) }
        { data.search.paginationInfo.hasMore &&
        <Button onClick={ onFetchMore } text={ 'Загрузить еще' } className={ 'menu-item' } />
        }
      </SearchDropDown>
      }
    </HeaderSearch>
  )
}
