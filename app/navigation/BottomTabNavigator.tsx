import * as React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { BottomTabParamList } from '../types'
import { TabHomeNavigation } from './TabHomeNavigation'
import { TabSearchNavigation } from './TabSearchNavigation'
import { TabAddNavigation } from './TabAddNavigation'
import { TabNewsNavigation } from './TabNewsNavigation'
import { TabProfileNavigation } from './TabProfileNavigation'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

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
          tabBarIcon: ({color}) => <TabBarIcon name="ios-home" color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabSearch"
        component={ TabSearchNavigation }
        options={ {
          tabBarIcon: ({color}) => <TabBarIcon name="ios-search" color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabAdd"
        component={ TabAddNavigation }
        options={ {
          tabBarIcon: ({color}) => <TabBarIcon name="ios-add-circle" color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabNews"
        component={ TabNewsNavigation }
        options={ {
          tabBarIcon: ({color}) => <TabBarIcon name="ios-heart" color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabProfile"
        component={ TabProfileNavigation }
        options={ {
          tabBarIcon: ({color}) => <TabBarIcon name="ios-person" color={ color }/>,
        } }
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={ 30 } style={ {marginBottom: -3} } { ...props } />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
