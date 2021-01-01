import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { IFeedQuery } from '@instagram/common'
import { HomePost } from '@components/post/HomePost'
import { VirtualizedView } from '@components/VirtualizeView'

type PropsType = {
  posts: IFeedQuery['feed']
  onFetchMore: (() => Promise<void>) | undefined
}
export const HomePosts: FC<PropsType> = ({posts, onFetchMore}) => {
  return (
    <VirtualizedView>
      <FlatList
        onScrollAnimationEnd={ onFetchMore }
        keyExtractor={ item => item.id?.toString() || '' }
        data={ posts.items }
        renderItem={ ({item}) => {
          return (
            <HomePost { ...item }/>
          )
        } }/>
    </VirtualizedView>
  )
}

const styles = StyleSheet.create({})
