import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabNavigator from '@navigation/BottomTabNavigator'
import { TabDirectNavigation } from '@navigation/Root/TabDirectNavigation'
import SharedNavigator from './SharedNavigator'

const AppTab = createStackNavigator()

export default function AppNavigator() {
  return (
    <AppTab.Navigator screenOptions={ {headerShown: false} }>
      <AppTab.Screen name="Home" component={ BottomTabNavigator }/>
      <AppTab.Screen name="Direct" component={ TabDirectNavigation }/>
      <AppTab.Screen name="Shared" component={ SharedNavigator }/>
    </AppTab.Navigator>
  )
}
