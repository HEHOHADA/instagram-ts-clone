import React, { FC } from 'react'
import { Image, StyleSheet } from 'react-native'


type PropsType = {
  style?: object
  uri: string
}

export const AppImage: FC<PropsType> = ({uri, style}) => {
  return (
    <Image source={ {uri} } style={ {...styles.default, ...style} }/>
  )
}

const styles = StyleSheet.create({
  default: {
    padding: 10,
    width: 40,
    height: 40,
    borderRadius: 1000
  }
})
