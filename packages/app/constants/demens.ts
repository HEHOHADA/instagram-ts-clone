import { Dimensions, Platform, StatusBar } from 'react-native'

export const navigationBarPaddingH = 8
export const navigationBarPaddingV = 8
export const navigationButtonIconSize = 24
export const navigationButtonIconMarginRight = 8
export const paddingH = 15
export const paddingV = 20
export const marginV = 15
export const marginH = 15
export const bottomTabHeight = 57
export const screenHeight = Math.round(Dimensions.get('window').height)
export const screenWidth = Math.round(Dimensions.get('window').width)
export const statusBarHeight = Platform.select({
  android: StatusBar.currentHeight,
  default: 0
})

export const bottomBarHeight = Platform.select({
  android: 0,
  default: 0
})
export const safeAreaBottomHeight = bottomTabHeight + bottomBarHeight
