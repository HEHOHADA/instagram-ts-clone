import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabHomeParamList } from '../types'
import HomeScreen from '../screens/Home/HomeScreen'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/ui/AppHeaderIcon'

const TabOneStack = createStackNavigator<TabHomeParamList>()

export function TabHomeNavigation() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabHomeScreen"
        component={ HomeScreen }
        options={ ({navigation}) => ({
            headerTitle: 'Instagram', headerRight: () => (
              <HeaderButtons
                HeaderButtonComponent={ AppHeaderIcon }>
                <Item title="Toggle Drawer" iconName="md-menu" onPress={ () =>
                  navigation }/>
              </HeaderButtons>
            )
          }
        ) }
      />
    </TabOneStack.Navigator>
  )
}
