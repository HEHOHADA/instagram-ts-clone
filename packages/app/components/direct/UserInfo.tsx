import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppImage } from '@ui/AppImage'
import { DEFAULT_IMAGE } from '@constants/default'
import { Text } from '@components/Themed'


type PropsType = {
  pictureUrl: string | null
  username: string
  text?: string
  photoStyles?: Object
}

export const UserInfo: FC<PropsType> = ({pictureUrl, photoStyles, username, text}) => {
  return (
    <View style={ styles.wrapper }>
      <View>
        <AppImage
          uri={ pictureUrl || DEFAULT_IMAGE }
          style={ {...styles.image, ...photoStyles} }/>
        <View style={ styles.onlinePoint }/>
      </View>
      <View style={ styles.info }>
        <Text style={ styles.infoName }>{ username }</Text>
        { text ? <Text style={ styles.infoMessage }>{ text }</Text> : null }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    paddingVertical: 5,
    marginLeft:10
  },
  infoName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  infoMessage: {
    color: '#928787'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  onlinePoint: {
    position: 'absolute',
    backgroundColor: '#79d70f',
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: -2,
    right: -2
  }
})
