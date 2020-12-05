import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabProfileParamList } from '../types'
import ProfileScreen from '../screens/Profile/ProfileScreen'

const TabOneStack = createStackNavigator<TabProfileParamList>()

export function TabProfileNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabProfileScreen"
        component={ ProfileScreen }
        options={ {headerTitle: 'Твой профиль'} }
      />
    </TabOneStack.Navigator>
  )
}
