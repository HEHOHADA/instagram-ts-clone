import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from '@navigation/BottomTabNavigator'
import * as React from 'react'
import { TabDirectNavigation } from '@navigation/Root/TabDirectNavigation'

const AppTab = createStackNavigator()

export default function AppNavigator() {
  return (
    <AppTab.Navigator screenOptions={ {headerShown: false} }>
      <AppTab.Screen name="Home" component={ BottomTabNavigator }/>
      <AppTab.Screen name="Direct" component={ TabDirectNavigation }/>
    </AppTab.Navigator>
  )
}
