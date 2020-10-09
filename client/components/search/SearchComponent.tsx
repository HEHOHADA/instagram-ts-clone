import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import useDropdown from '@/hooks/useDropdown'
import useDebounce from '@/hooks/useDebounce'
import { useSearchLazyQuery } from '@/geterated/apollo'

export const SearchComponent = () => {
  const {dropDownRef, isOpen, open} = useDropdown()
  const [searchString, serSearchString] = useState<string>('')
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
      [debouncedSearchTerm]
  )
  return (
      <div className="header__search">
        <input
            onChange={ (e) => serSearchString(e.target.value) }
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
                    <Link
                        key={ user.id }
                        href={'/[username]'}
                        as={ `/${ user.username }` }
                        passHref>
                      <a
                          className="menu-item">
                        { user.username }
                      </a>
                    </Link>
                )
              })
            }
            { data.search.paginationInfo.hasMore &&
            < button className='menu-item' onClick={ onFetchMore }>Загрузить еще</button> }
          </div>
        </div>
        }
      </div>
  )
}
