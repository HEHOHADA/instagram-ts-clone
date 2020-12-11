import { createStackNavigator } from '@react-navigation/stack'
import { AuthParamList } from '@type/navigation'
import * as React from 'react'
import ForgotPasswordScreen from '@screens/Auth/ForgotPasswordScreen'
import LoginScreen from '@screens/Auth/LoginScreen'

const AuthNavigationStack = createStackNavigator<AuthParamList>()

export function AuthNavigation() {
  return (
    <AuthNavigationStack.Navigator
      screenOptions={ {headerShown: false} }
                                   initialRouteName="TabLogin">
      <AuthNavigationStack.Screen
        name="TabLogin"
        component={ LoginScreen }
      />
      <AuthNavigationStack.Screen
        name="TabForgotPassword"
        component={ ForgotPasswordScreen }
      />
    </AuthNavigationStack.Navigator>
  )
}
