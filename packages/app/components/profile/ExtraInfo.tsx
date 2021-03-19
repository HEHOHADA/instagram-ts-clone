import React, { FC } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components/Themed'

type PropsType = {
  info: string | number | undefined | null
  textInfo: string
  onOpen?: () => void
}

export const ExtraInfo: FC<PropsType> = ({info = 0, onOpen, textInfo}) => {
  return (
    <TouchableOpacity style={ styles.wrapper } onPress={ onOpen }>
      <Text style={ styles.text }>{ info }</Text>
      <Text>{ textInfo }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  }
})
