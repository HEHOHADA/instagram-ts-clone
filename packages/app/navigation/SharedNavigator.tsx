import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PostScreen from '@screens/Shared/PostScreen'
import { SharedTabParamList } from '@type/navigation'
import ProfileNavigation from '@navigation/Profile'

const Stack = createStackNavigator<SharedTabParamList>()

function SharedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="PostScreen" options={ {title: 'Posts'} } component={ PostScreen }/>
      <Stack.Screen name="Profile"
                    options={ {title: ''} }
                    component={ ProfileNavigation }/>
    </Stack.Navigator>
  )
}

export default SharedNavigator
