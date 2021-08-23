import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { AppImage } from '../ui/AppImage'
import { screenWidth } from 'constants/demens'

type PropsType = {
  navigate: (id: string) => void
  uri: string
  id: string
}

export const GalleryImage: FC<PropsType> = ({uri, navigate, id}) => {
  return (
    <TouchableOpacity
      onPress={ () => navigate(id) }
      delayLongPress={ 300 }
      activeOpacity={ 0.8 }
      style={ {
        ...styles.photoWrapper,
        marginRight: (1) % 3 === 0 ? 0 : 5,
      } }>
      { <AppImage uri={ uri } style={ styles.photo }/> }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    marginHorizontal: 2,
    borderRadius: 8,
  },
  photoWrapper: {
    position: 'relative',
    width: screenWidth / 3 - 5,
    height: screenWidth / 3 - 5,
    marginBottom: 5,
  },
  photo: {
    width: '100%',
    height: '100%'
  },
})
