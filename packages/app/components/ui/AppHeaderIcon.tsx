import React, { FC } from 'react'
import { Platform } from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

type PropsType = {
  title: string
}

export const AppHeaderIcon: FC<PropsType> = (props) => {
  return (
    <HeaderButton
      { ...props }
      iconSize={ 24 }
      IconComponent={ Ionicons }
      color={ Platform.OS === 'ios' ? Colors.light.tabIconDefault : 'white' }/>

  )
}

