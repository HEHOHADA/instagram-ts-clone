import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabDirectParamList } from '@types/navigation'
import ProfileScreen from '../../screens/Profile/ProfileScreen'

const TabDirectStack = createStackNavigator<TabDirectParamList>()

export function TabDirectNavigation() {
  return (
    <TabDirectStack.Navigator>
      <TabDirectStack.Screen
        name="TabDirectScreen"
        component={ ProfileScreen }
        options={ {headerTitle: 'Твой профиль'} }
      />
    </TabDirectStack.Navigator>
  )
}
