import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { NAVIGATION_BAR_PADDING_V } from '@constants/demens'
import { HistoryItems } from '@components/history/HistoryItems'

import { useQuery } from '@apollo/client'
import { HomePosts } from '@components/post/HomePosts'
import { FeedDocument } from '@instagram/common'

const data = [
  {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '1'
  },
]


export default function HomeScreen() {
  const {data: dataFeed, loading, fetchMore, variables} = useQuery(FeedDocument, {
    variables: {
      limit: 2,
      cursor: null as null | string
    }
  })

  const onFetchMore = async () => {
    await fetchMore({
      variables: {
        limit: variables!.limit,
        cursor: dataFeed?.feed.items[dataFeed?.feed.items.length - 1].date
      }
    })
  }
  return (
    <ScrollView>
      <SafeAreaView style={ styles.container }>
        <HistoryItems data={ data }/>
        { dataFeed && !loading &&
        <HomePosts
          onFetchMore={ dataFeed.feed.paginationInfo.hasMore ? onFetchMore : undefined }
          posts={ dataFeed.feed }/> }
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: NAVIGATION_BAR_PADDING_V,
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
