import React, { FC } from 'react'
import { Image, StyleSheet } from 'react-native'
import { DEFAULT_IMAGE } from '@constants/default'
import { Maybe } from 'graphql/jsutils/Maybe'


type PropsType = {
  style?: object
  uri?: Maybe<string>
}

export const AppImage: FC<PropsType> = ({uri, style}) => {
  return (
    <Image source={ {uri: uri || DEFAULT_IMAGE} } style={ {...styles.default, ...style} }/>
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
