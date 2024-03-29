import * as React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { HeaderButtons } from 'react-navigation-header-buttons'
import { TabHomeParamList } from '../../types/navigation'
import { AppHeaderIcon } from '../../components/ui/AppHeaderIcon'
import HomeScreen from '../../screens/Home/HomeScreen'


const TabHomeStack = createStackNavigator<TabHomeParamList>()

export function TabHomeNavigation() {
  return (
    <TabHomeStack.Navigator>
      <TabHomeStack.Screen
        name="TabHomeScreen"
        component={ HomeScreen }
        options={ ({navigation}) => ({
            headerTitle: 'Instagram', headerRight: () => (
              <HeaderButtons
                HeaderButtonComponent={ AppHeaderIcon }>
                <FontAwesome5 name="telegram-plane" size={ 30 } color="black"
                              onPress={ () => navigation.navigate('Direct', {screen: 'TabDirectScreen'}) }/>
              </HeaderButtons>
            )
          }
        ) }
      />
    </TabHomeStack.Navigator>
  )
}
