import { createStackNavigator } from '@react-navigation/stack'
import { TabAddParamList } from '../types'
import * as React from 'react'
import AddScreen from '../screens/Add/AddScreen'

const TabOneStack = createStackNavigator<TabAddParamList>()

export function TabAddNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabAddScreen"
        component={ AddScreen }
        options={ {headerTitle: 'ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЕЙ'} }
      />
    </TabOneStack.Navigator>
  )
}
