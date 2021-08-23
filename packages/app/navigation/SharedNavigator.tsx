import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileNavigation from './Profile'
import { SharedTabParamList } from '../types/navigation'
import PostScreen from '../screens/Shared/PostScreen'

const Stack = createStackNavigator<SharedTabParamList>()

function SharedNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='PostScreen' options={ { title: 'Posts' } } component={ PostScreen } />
      <Stack.Screen name='Profile'
                    options={ { title: '' } }
                    component={ ProfileNavigation } />
    </Stack.Navigator>
  )
}

export default SharedNavigator
