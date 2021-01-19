import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Text, View } from '@components/Themed'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SharedTabParamList } from '@type/navigation'
import { useQuery } from '@apollo/client'
import { IViewPhotoByIdQuery, ViewPhotoByIdDocument } from '@instagram/common'
import { SCREEN_HEIGHT } from '@constants/demens'
import { PostItem } from '@components/post/PostItem'

export default function PostScreen() {
  const {params} = useRoute<RouteProp<SharedTabParamList, 'PostScreen'>>()
  const {data} = useQuery<IViewPhotoByIdQuery>(ViewPhotoByIdDocument, {variables: {id: params.id}})
  console.log(data)
  return (
    <SafeAreaView style={ styles.container }>
      <PostItem  { ...(data?.viewPhotoById as any) || {} } />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
    width: '100%',
    height: SCREEN_HEIGHT
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
