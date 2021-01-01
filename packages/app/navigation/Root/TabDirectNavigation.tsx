import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabDirectParamList } from '@type/navigation'
import DirectScreen from '@screens/Direct/DirectScreen'

const TabDirectStack = createStackNavigator<TabDirectParamList>()

export function TabDirectNavigation() {
  return (
    <TabDirectStack.Navigator>
      <TabDirectStack.Screen
        name="TabDirectScreen"
        component={ DirectScreen }
        options={ {headerTitle: 'Твой профиль'} }
      />
    </TabDirectStack.Navigator>
  )
}
