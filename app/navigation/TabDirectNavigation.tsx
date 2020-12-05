import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabDirectParamList } from '../types'
import ProfileScreen from '../screens/Profile/ProfileScreen'

const TabOneStack = createStackNavigator<TabDirectParamList>()

export function TabDirectNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabDirectScreen"
        component={ ProfileScreen }
        options={ {headerTitle: 'Твой профиль'} }
      />
    </TabOneStack.Navigator>
  )
}
