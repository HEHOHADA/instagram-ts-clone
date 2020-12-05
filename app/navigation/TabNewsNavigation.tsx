import { createStackNavigator } from '@react-navigation/stack'
import { TabNewsParamList } from '../types'
import * as React from 'react'
import NewsScreen from '../screens/News/NewsScreen'

const TabOneStack = createStackNavigator<TabNewsParamList>()

export function TabNewsNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabNewsScreen"
        component={ NewsScreen }
        options={ {headerTitle: 'Последние новости'} }
      />
    </TabOneStack.Navigator>
  )
}
