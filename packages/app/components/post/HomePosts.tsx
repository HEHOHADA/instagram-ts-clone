import React, { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { IFeedQuery } from '@instagram/common'
import { PostItem } from '@components/post/PostItem'
import { VirtualizedView } from '@components/VirtualizeView'
import { useNavigation } from '@react-navigation/native'
import { useNavigate } from '@hooks/useNavigate'

type PropsType = {
  posts: IFeedQuery['feed']
  onFetchMore: (() => Promise<void>) | undefined
}
export const HomePosts: FC<PropsType> = ({posts, onFetchMore}) => {
  const {navigateToPostId, navigateToProfile} = useNavigate()

  return (
    <VirtualizedView>
      <FlatList
        onScrollAnimationEnd={ onFetchMore }
        keyExtractor={ item => item.id?.toString() || '' }
        data={ posts.items }
        renderItem={ ({item}) => {
          return (
            <PostItem
              onNavigateProfile={navigateToProfile}
              onNavigatePost={ navigateToPostId }
                      { ...item }/>
          )
        } }/>
    </VirtualizedView>
  )
}

const styles = StyleSheet.create({})
