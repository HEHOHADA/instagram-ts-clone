import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { TabHomeNavigation } from './Root/TabHomeNavigation'
import { TabSearchNavigation } from './Root/TabSearchNavigation'
import { TabAddNavigation } from './Root/TabAddNavigation'
import { TabNewsNavigation } from './Root/TabNewsNavigation'
import { BottomTabParamList } from '../types/navigation'
import ProfileNavigation from './Profile'
import { AppIcon } from '../components/ui/AppIcon'
import { icons } from '../constants/icons'
import useColorScheme from '../hooks/useColorScheme'
import { useMeQuery } from '../geterated'
import Colors from 'constants/colors'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
type ColorType = {
  color: string
}
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const {data} =useMeQuery({})
  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      tabBarOptions={ {activeTintColor: Colors[colorScheme].tint, showLabel: false} }>
      <BottomTab.Screen
        name="TabHome"
        component={ TabHomeNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ icons.home } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabSearch"
        component={ TabSearchNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ icons.search } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabAdd"
        component={ TabAddNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ icons.plus } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabNews"
        component={ TabNewsNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ icons.like } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabProfile"
        initialParams={ {queryUserName: data?.me?.username} }
        component={ ProfileNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ icons.person }
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
