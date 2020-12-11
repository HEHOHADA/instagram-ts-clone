import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { BottomTabParamList } from '@type/navigation'
import { TabHomeNavigation } from './Root/TabHomeNavigation'
import { TabSearchNavigation } from './Root/TabSearchNavigation'
import { TabAddNavigation } from './Root/TabAddNavigation'
import { TabNewsNavigation } from './Root/TabNewsNavigation'
import { TabProfileNavigation } from './Root/TabProfileNavigation'
import { TabBarIcon } from '@components/ui/AppIcon'
import { ICONS } from '@constants/icons'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
type ColorType = {
  color: string
}
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()

  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      tabBarOptions={ {activeTintColor: Colors[colorScheme].tint, showLabel: false} }>
      <BottomTab.Screen
        name="TabHome"
        component={ TabHomeNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <TabBarIcon name={ ICONS.home } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabSearch"
        component={ TabSearchNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <TabBarIcon name={ ICONS.search } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabAdd"
        component={ TabAddNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <TabBarIcon name={ ICONS.plus } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabNews"
        component={ TabNewsNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <TabBarIcon name={ ICONS.like } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabProfile"
        component={ TabProfileNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <TabBarIcon name={ ICONS.person }
                                                          color={ color }/>,
        } }
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
