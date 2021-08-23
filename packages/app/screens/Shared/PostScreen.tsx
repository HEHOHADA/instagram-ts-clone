import * as React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { SharedTabParamList } from 'types/navigation'
import { screenHeight } from 'constants/demens'
import { useLikeHandler } from 'hooks/useLike'
import { AppLoader } from 'components/ui/AppLoader'
import { useNavigate } from 'hooks/useNavigate'
import { PostItem } from 'components/post/PostItem'
import { useViewPhotoByIdQuery } from '../../geterated'


export default function PostScreen() {
  const { params } = useRoute<RouteProp<SharedTabParamList, 'PostScreen'>>()
  const {
    data,
    loading
  } = useViewPhotoByIdQuery({ variables: { id: params.id } })
  const { likeHandler } = useLikeHandler()
  const { navigateToProfile } = useNavigate()
  return (
    <SafeAreaView style={ styles.container }>
      { !data?.viewPhotoById || loading ? <AppLoader /> :
        <PostItem onNavigateProfile={ navigateToProfile }
                  onLike={ likeHandler } { ...(data?.viewPhotoById as any) || {} } /> }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f8fc',
    width: '100%',
    height: screenHeight
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
