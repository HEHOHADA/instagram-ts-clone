import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Colors from '@constants/Colors'
import useColorScheme from '@hooks/useColorScheme'
import { BottomTabParamList } from '@type/navigation'
import { TabHomeNavigation } from './Root/TabHomeNavigation'
import { TabSearchNavigation } from './Root/TabSearchNavigation'
import { TabAddNavigation } from './Root/TabAddNavigation'
import { TabNewsNavigation } from './Root/TabNewsNavigation'
import { AppIcon } from '@components/ui/AppIcon'
import { ICONS } from '@constants/icons'
import { useQuery } from '@apollo/client'
import { IMeQuery, MeDocument } from '@instagram/common'
import ProfileNavigation from '@navigation/Profile'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
type ColorType = {
  color: string
}
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const {data} = useQuery<IMeQuery>(MeDocument)
  return (
    <BottomTab.Navigator
      initialRouteName="TabHome"
      tabBarOptions={ {activeTintColor: Colors[colorScheme].tint, showLabel: false} }>
      <BottomTab.Screen
        name="TabHome"
        component={ TabHomeNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ ICONS.home } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabSearch"
        component={ TabSearchNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ ICONS.search } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabAdd"
        component={ TabAddNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ ICONS.plus } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabNews"
        component={ TabNewsNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ ICONS.like } color={ color }/>,
        } }
      />
      <BottomTab.Screen
        name="TabProfile"
        initialParams={ {queryUserName: data?.me?.username} }
        component={ ProfileNavigation }
        options={ {
          tabBarIcon: ({color}: ColorType) => <AppIcon name={ ICONS.person }
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
