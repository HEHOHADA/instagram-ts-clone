import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TabDirectParamList } from '@type/navigation'
import DirectScreen from '@screens/Direct/DirectScreen'
import { UserInfo } from '@components/direct/UserInfo'
import ChatScreen from '@screens/Direct/ChatScreen'
import { TouchableOpacity } from 'react-native'

const TabDirectStack = createStackNavigator<TabDirectParamList>()

export function TabDirectNavigation() {
  return (
    <TabDirectStack.Navigator>
      <TabDirectStack.Screen
        name="TabDirectScreen"
        component={ DirectScreen }
        options={ {headerTitle: 'Direct'} }
      />
      <TabDirectStack.Screen
        name="TabChatScreen"
        component={ ChatScreen }
        options={ ({route, navigation}) => ({
          headerTitleContainerStyle: {left: 50},
          headerTitleStyle: {marginHorizontal: 20},
          headerTitle: () => (
            <TouchableOpacity
              onLongPress={ () => navigation.navigate('Shared', {
                screen: 'ProfileScreen',
                params: {queryUserName: route.params.name}
              }) } activeOpacity={ 0.8 }>
              <UserInfo
                photoStyles={ {width: 30, height: 30} }
                pictureUrl={ route.params.url }
                username={ route.params.name }
                text={ route.params.message }/>
            </TouchableOpacity>
          )
        }) }
      />
    </TabDirectStack.Navigator>
  )
}
