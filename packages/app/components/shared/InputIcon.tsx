import React, { FC } from 'react'
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View, ViewStyle
} from 'react-native'
import { AppIcon } from '@ui/AppIcon'
import { SCREEN_WIDTH } from '@constants/demens'

type PropsType = {
  value: string
  onChangeText: (text: string) => void
  iconName?: string
  inputProps?: Object
  opacity?: number
  onPress?: () => void
  iconStyle?: StyleProp<ViewStyle>
}

export const InputIcon: FC<PropsType> = ({
                                           value,
                                           onPress,
                                           opacity,
                                           inputProps,
                                           iconName,
                                           onChangeText,
                                           iconStyle
                                         }) => {
  return (
    <>
      { iconName ?
        <TouchableOpacity style={ iconStyle } activeOpacity={ opacity }
                          onPress={ onPress }>
          <AppIcon style={ styles.icon } size={ 20 } color={ 'black' } name={ iconName }/>
        </TouchableOpacity> : null }
      <TextInput
        value={ value }
        onChangeText={ onChangeText }
        placeholder={ 'Поиск' }
        autoCorrect={ false }
        style={ styles.input }
        { ...inputProps }
      />
    </>
  )
}

const styles = StyleSheet.create({
    icon: {
      padding: 10
    },
    input: {
      width: SCREEN_WIDTH * 0.7,
      height: '100%',
      paddingHorizontal: 15
    },
  }
)
