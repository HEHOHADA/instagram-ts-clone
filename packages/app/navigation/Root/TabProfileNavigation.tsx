import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabProfileParamList } from '@type/navigation'
import ProfileScreen from '@screens/Profile/ProfileScreen'
import { IMeQuery, MeDocument } from '@instagram/common'
import { useQuery } from '@apollo/client'

const TabProfileStack = createStackNavigator<TabProfileParamList>()

export function TabProfileNavigation() {
  const {data} = useQuery<IMeQuery>(MeDocument)
  return (
    <TabProfileStack.Navigator>
      <TabProfileStack.Screen
        name="TabProfileScreen"
        component={ ProfileScreen }
        initialParams={ {queryUserName: data!.me!.username} }
        options={ {headerTitle: `${ data!.me!.username }`} }
      />
    </TabProfileStack.Navigator>
  )
}
