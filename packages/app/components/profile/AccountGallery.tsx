import { SCREEN_WIDTH } from '@constants/demens'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { GalleryImage } from './GalleryImage'
import { IPhoto } from '@instagram/common'
import { useNavigation } from '@react-navigation/native'


export const AccountGallery: FC<{ photos: Array<IPhoto> }> = ({photos}) => {
  const {navigate} = useNavigation()
  const navigationHandler = (id: string) => {
  }
  return (
    <View style={ styles.container }>
      { photos && photos.map(photo => (
        <GalleryImage
          id={ photo.id }
          navigate={ navigationHandler }
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
