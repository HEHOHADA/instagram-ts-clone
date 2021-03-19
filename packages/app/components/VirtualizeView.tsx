import React, { FC } from 'react'
import { FlatList } from 'react-native'

export const VirtualizedView: FC = (props) => {
  return (
    <FlatList
      data={ [] }
      ListEmptyComponent={ null }
      keyExtractor={ () => 'dummy' }
      renderItem={ null }
      ListHeaderComponent={ () => (
        <React.Fragment>{ props.children }</React.Fragment>
      ) }
    />
  )
}
