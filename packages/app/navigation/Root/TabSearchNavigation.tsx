import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SearchScreen from '../../screens/Search/SearchScreen'
import { TabSearchParamList } from '../../types/navigation'

const TabSearchStack = createStackNavigator<TabSearchParamList>()

export function TabSearchNavigation() {
  return (
    <TabSearchStack.Navigator>
      <TabSearchStack.Screen
        name="TabSearchScreen"
        component={ SearchScreen }
        options={ {headerTitle: 'Поиск'} }
      />
    </TabSearchStack.Navigator>
  )
}
