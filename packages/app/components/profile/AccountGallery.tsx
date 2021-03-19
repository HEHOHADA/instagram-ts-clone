import { SCREEN_WIDTH } from '@constants/demens'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GalleryImage } from './GalleryImage'
import { IPhoto } from '@instagram/common'
import { useNavigation } from '@react-navigation/native'
import { useNavigate } from '@hooks/useNavigate'

type PropsType = {
  photos: Array<IPhoto>
}
export const AccountGallery: FC<PropsType> = ({photos}) => {
  const {navigateToPostId} = useNavigate()
  return (
    <View style={ styles.container }>
      { photos && photos.map(photo => (
        <GalleryImage
          id={ photo.id }
          key={ photo.id }
          navigate={ navigateToPostId }
          uri={ photo.pictureUrl }/>
      )) }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
})
