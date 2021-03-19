import React, { useEffect, useState } from 'react'

import useDropdown from '@/hooks/useDropdown'
import useDebounce from '@/hooks/useDebounce'
import { Button } from '@/components/utils/Button'
import { LinkItem } from '@/components/utils/LinkItem'
import { useSearchLazyQuery } from '@instagram/common'

export const SearchComponent = () => {
  const {dropDownRef, isOpen, open} = useDropdown()
  const [searchString, setSearchString] = useState<string>('')
  const debouncedSearchTerm = useDebounce<string>(searchString, 500)
  const [loadSearch, {called, loading, data, variables, fetchMore}] = useSearchLazyQuery({
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
    [debouncedSearchTerm,isOpen,open,loadSearch]
  )

  return (
    <div className="header__search">
      <input
        onChange={ (e) => setSearchString(e.target.value) }
        type="text" placeholder="Search"
        className="header__searchInput"/>
      <button className="header__searchButton"
              onClick={ onFetchMore }>
        <i className="material-icons">
          search
        </i>
      </button>
      { isOpen && called && data && !loading &&
      <div className="dropdown search__dropdown" ref={ dropDownRef }>
        <div className="menu">
          {
            data.search.items.map(user => {
              return (
                <LinkItem
                  key={ user.id }
                  href={ '/[username]' }
                  linkClassName={ '"menu-item"' }
                  as={ `/${ user.username }` }
                  passHref
                  LinkContent={ user.username }/>
              )
            })
          }
          { data.search.paginationInfo.hasMore &&
          <Button onClick={ onFetchMore } text={ 'Загрузить еще' } className={ 'menu-item' }/>
          }
        </div>
      </div>
      }
    </div>
  )
}
