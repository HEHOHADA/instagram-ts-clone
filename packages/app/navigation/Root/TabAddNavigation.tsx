import { createStackNavigator } from '@react-navigation/stack'
import { TabAddParamList } from '@type/navigation'
import * as React from 'react'
import AddScreen from '../../screens/Add/AddScreen'

const TabAddStack = createStackNavigator<TabAddParamList>()

export function TabAddNavigation() {
  return (
    <TabAddStack.Navigator>
      <TabAddStack.Screen
        name="TabAddScreen"
        component={ AddScreen }
        options={ {headerTitle: 'ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЕЙ'} }
      />
    </TabAddStack.Navigator>
  )
}
