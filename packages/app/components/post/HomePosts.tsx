import React, { FC } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { IFeedQuery } from '@instagram/common'
import { PostItem } from '@components/post/PostItem'
import { VirtualizedView } from '@components/VirtualizeView'
import { useNavigate } from '@hooks/useNavigate'
import { HistoryItems } from '@components/history/HistoryItems'
import { useLikeHandler } from '@hooks/useLike'

const data = [
  {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '1'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '2'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '3'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '4'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '5'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '6'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '7'
  }, {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '8'
  },
]

type PropsType = {
  posts: IFeedQuery['feed']
  onFetchMore: (() => Promise<void>) | undefined
}
export const HomePosts: FC<PropsType> = ({posts, onFetchMore}) => {
  const {navigateToPostId, navigateToProfile} = useNavigate()
  const {likeHandler} = useLikeHandler()
  return (
    <VirtualizedView>
      <FlatList
        ListHeaderComponent={ <HistoryItems data={ data }/> }
        onEndReachedThreshold={ 0.5 }
        onEndReached={ onFetchMore }
        keyExtractor={ item => item.id?.toString() || '' }
        data={ posts.items }
        renderItem={ ({item}) => {
          return (
            <PostItem
              onLike={ likeHandler }
              onNavigateProfile={ navigateToProfile }
              onNavigatePost={ navigateToPostId }
              { ...item }/>
          )
        } }/>
    </VirtualizedView>
  )
}
