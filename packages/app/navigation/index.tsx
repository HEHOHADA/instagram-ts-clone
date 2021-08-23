import * as React from 'react'
import { ColorSchemeName } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import LinkingConfiguration from './LinkingConfiguration'
import { AuthNavigation } from './Auth/AuthNavigation'
import AppNavigator from './ConnectionNavigator'
import { RootStackParamList } from 'types/navigation'
import NotFoundScreen from '../screens/NotFoundScreen'
import { useMeQuery } from '../geterated'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={ LinkingConfiguration }
      theme={ colorScheme === 'dark' ? DarkTheme : DefaultTheme }>
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator() {
  const { data, loading } = useMeQuery()
  console.log(data, loading)
  return (
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      { !data?.me ? <Stack.Screen name='Auth'
                                  component={ AuthNavigation } /> :
        <Stack.Screen name='Root' component={ AppNavigator } /> }
      <Stack.Screen name='NotFound' component={ NotFoundScreen } options={ { title: 'Oops!' } } />
    </Stack.Navigator>
  )
}
