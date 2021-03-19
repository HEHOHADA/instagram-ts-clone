import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '@screens/Profile/ProfileScreen'
import FollowScreen from '@screens/Profile/FollowScreen'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TabProfileParams } from '@type/navigation'

const TabProfile = createStackNavigator<TabProfileParams>()

export function ProfileNavigation() {
  const {params} = useRoute<RouteProp<TabProfileParams, 'ProfileScreen'>>()
  return (
    <TabProfile.Navigator>
      <TabProfile.Screen
        name="ProfileScreen"
        initialParams={ {queryUserName: params.queryUserName} }
        options={ {title: params.queryUserName} }
        component={ ProfileScreen }
      />
      <TabProfile.Screen
        name="FollowScreen"
        options={ {title: params.queryUserName} }
        component={ FollowScreen }
      />
    </TabProfile.Navigator>
  )
}

export default ProfileNavigation
