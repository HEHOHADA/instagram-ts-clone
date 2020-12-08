import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabProfileParamList } from '@types/navigation'
import ProfileScreen from '../../screens/Profile/ProfileScreen'

const TabProfileStack = createStackNavigator<TabProfileParamList>()

export function TabProfileNavigation() {
  return (
    <TabProfileStack.Navigator>
      <TabProfileStack.Screen
        name="TabProfileScreen"
        component={ ProfileScreen }
        options={ {headerTitle: 'Твой профиль'} }
      />
    </TabProfileStack.Navigator>
  )
}
