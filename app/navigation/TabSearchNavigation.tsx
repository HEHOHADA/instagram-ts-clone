import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabSearchParamList } from '../types'
import SearchScreen from '../screens/Search/SearchScreen'

const TabOneStack = createStackNavigator<TabSearchParamList>()

export function TabSearchNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabSearchScreen"
        component={ SearchScreen }
        options={ {headerTitle: 'Поиск'} }
      />
    </TabOneStack.Navigator>
  )
}
