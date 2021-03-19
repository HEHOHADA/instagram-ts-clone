import { Ionicons } from '@expo/vector-icons'
import * as React from 'react'
import { ICON_SIZE } from '@constants/icons'

type PropsType = {
  name: string
  color: string
  size?: number
  style?: Object
}

export function AppIcon({style,...props}: PropsType) {
  // @ts-ignore
  return <Ionicons size={ ICON_SIZE.big } style={ {marginBottom: -3,...style} } { ...props } />
}
