import { Dimensions, Platform, StatusBar } from 'react-native'

export const NAVIGATION_BAR_PADDING_H = 8
export const NAVIGATION_BAR_PADDING_V = 8
export const NAVIGATION_BUTTON_ICON_SIZE = 24
export const NAVIGATION_BUTTON_ICON_MARGIN_RIGHT = 8
export const PADDING_H = 15
export const PADDING_V = 20
export const MARGIN_V = 15
export const MARGIN_H = 15
export const BOTTOM_TAB_HEIGHT = 57
export const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height)
export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width)
export const STATUS_BAR_HEIGHT = Platform.select({
  android: StatusBar.currentHeight,
  default: 0
})

export const BOTTOM_BAR_HEIGHT = Platform.select({
  android: 0,
  default: 0
})
export const SAFE_AREA_BOTTOM_HEIGHT = BOTTOM_TAB_HEIGHT + BOTTOM_BAR_HEIGHT
