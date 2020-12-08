import { createStackNavigator } from '@react-navigation/stack'
import { TabNewsParamList } from '@types/navigation'
import * as React from 'react'
import NewsScreen from '../../screens/News/NewsScreen'

const TabNewsStack = createStackNavigator<TabNewsParamList>()

export function TabNewsNavigation() {
  return (
    <TabNewsStack.Navigator>
      <TabNewsStack.Screen
        name="TabNewsScreen"
        component={ NewsScreen }
        options={ {headerTitle: 'Последние новости'} }
      />
    </TabNewsStack.Navigator>
  )
}
