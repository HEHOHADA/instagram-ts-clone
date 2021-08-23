import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GalleryImage } from './GalleryImage'
import { useNavigate } from '../../hooks/useNavigate'
import { screenWidth } from '../../constants/demens'
import { IPhoto } from '../../geterated'

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
    width: screenWidth,
    backgroundColor: '#fff',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
})
