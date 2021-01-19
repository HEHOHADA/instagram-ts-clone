import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PostScreen from '@screens/Shared/PostScreen'
import { SharedTabParamList } from '@type/navigation'
import ProfileScreen from '@screens/Profile/ProfileScreen'

const Stack = createStackNavigator<SharedTabParamList>()

function SharedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostScreen" component={ PostScreen }/>
      <Stack.Screen name="ProfileScreen"
                    options={({ route }) => ({ title: route.params.queryUserName })}
                    component={ ProfileScreen }/>
    </Stack.Navigator>
  )
}

export default SharedNavigator
