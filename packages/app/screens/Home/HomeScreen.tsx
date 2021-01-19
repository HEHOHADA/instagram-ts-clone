import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { NAVIGATION_BAR_PADDING_V } from '@constants/demens'
import { HistoryItems } from '@components/history/HistoryItems'

import { useQuery } from '@apollo/client'
import { HomePosts } from '@components/post/HomePosts'
import { FeedDocument } from '@instagram/common'

export default function HomeScreen() {
  const {data: dataFeed, loading, refetch, variables} = useQuery(FeedDocument, {
    variables: {
      limit: 2,
      cursor: null as null | string
    }
  })

  const onFetchMore = async () => {
    await refetch({
        limit: variables!.limit,
        cursor: dataFeed?.feed.items[dataFeed?.feed.items.length - 1].date
      }
    )
  }
  return (
    <SafeAreaView style={ styles.container }>
      { dataFeed && !loading &&
      <HomePosts
        onFetchMore={ dataFeed.feed.paginationInfo.hasMore ? onFetchMore : undefined }
        posts={ dataFeed.feed }/> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: NAVIGATION_BAR_PADDING_V,
    color: 'white'
  },
})
