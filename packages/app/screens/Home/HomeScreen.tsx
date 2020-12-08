import * as React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { NAVIGATION_BAR_PADDING_V } from '@constants/demens'
import { HistoryItems } from '@components/history/HistoryItems'
import { View } from '@components/Themed'
import { HomePost } from '@components/post/HomePost'


const data = [
  {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
    profile: 'naass',
    id: '1'
  },
]

const posts = [
  {
    uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-15/e35/p1080x1080/127635564_660216101326400_5131144735374551526_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_cat=1&_nc_ohc=rEx7XJV8WYUAX_HxLvG&tp=1&oh=315dfdcb6da8da7d3286bf054941bbe4&oe=5FF869DB',
    likeCount: 5,
    comments: [
      {comment: 'hello', owner: 'me'}
    ],
    owner: {
      uri: 'https://scontent-frx5-1.cdninstagram.com/v/t51.2885-19/s150x150/106558826_282409769486623_7544924254557319006_n.jpg?_nc_ht=scontent-frx5-1.cdninstagram.com&_nc_ohc=NLFtu8HPoHkAX917glb&tp=1&oh=b6a31acfadc341c3377e2df012588a00&oe=5FF67A22',
      ownerName: 'dsadsa',
      place: 'moskow',
    },
    id: '1'
  },
]
export default function HomeScreen() {
  return (
    <View style={ styles.container }>
      <ScrollView>
        <HistoryItems data={ data }/>
        <HomePost posts={ posts }/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: NAVIGATION_BAR_PADDING_V,
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
