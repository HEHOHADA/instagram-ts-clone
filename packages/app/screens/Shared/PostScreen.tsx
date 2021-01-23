import * as React from 'react'
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SharedTabParamList } from '@type/navigation'
import { useQuery } from '@apollo/client'
import { IViewPhotoByIdQuery, ViewPhotoByIdDocument } from '@instagram/common'
import { SCREEN_HEIGHT } from '@constants/demens'
import { PostItem } from '@components/post/PostItem'
import { useLikeHandler } from '@hooks/useLike'

export default function PostScreen() {
  const {params} = useRoute<RouteProp<SharedTabParamList, 'PostScreen'>>()
  const {
    data,
    loading
  } = useQuery<IViewPhotoByIdQuery>(ViewPhotoByIdDocument, {variables: {id: params.id}})
  const {onLikeHandler} = useLikeHandler()
  return (
    <SafeAreaView style={ styles.container }>
      { data?.viewPhotoById || loading ? <ActivityIndicator/> :
        <PostItem onLike={ onLikeHandler } { ...(data?.viewPhotoById as any) || {} } /> }
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
