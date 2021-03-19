import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { AppImage } from '@ui/AppImage'
import { MonoText } from '@ui/StyledText'

type PropsType = {
  uri: string
  profile: string
}

export const HistoryPhoto: FC<PropsType> = ({uri, profile}) => {
  return (
    <View style={ styles.wrapper }>
      <AppImage uri={ uri } style={ styles.historyPhoto }/>
      <MonoText style={ styles.text }>
        { profile }
      </MonoText>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  historyPhoto: {
    height: 60,
    width: 60
  },
  text: {
    fontSize: 14,
  }
})
