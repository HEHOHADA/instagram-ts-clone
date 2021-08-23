import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { useFeedQuery } from '../../geterated'
import { HomePosts } from 'components/post/HomePosts'
import { AppLoader } from 'components/ui/AppLoader'
import { navigationBarPaddingV } from 'constants/demens'


export default function HomeScreen() {
  const {data: dataFeed, loading, refetch, variables} = useFeedQuery({
    variables: {
      limit: 2,
      cursor: null as null | string
    }
  })

  const onFetchMore = async () => {
    refetch({
        limit: variables!.limit,
        cursor: dataFeed?.feed.items[dataFeed?.feed.items.length - 1].date
      }
    )
  }

  return (
    <SafeAreaView style={ styles.container }>
      { dataFeed && !loading ?
        <HomePosts
          onFetchMore={ dataFeed.feed.paginationInfo.hasMore ? onFetchMore : undefined }
          posts={ dataFeed.feed }/> : <AppLoader/> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: navigationBarPaddingV,
    color: 'white'
  },
})
