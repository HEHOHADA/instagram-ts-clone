import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DriverTabParamsList } from '../types/navigation'
import HomeScreen from '../screens/Home/HomeScreen'

const DrawerTab = createDrawerNavigator<DriverTabParamsList>()

export const HomeNavigator = () => (
  <DrawerTab.Navigator
    screenOptions={ {gestureEnabled: false} }>
    <DrawerTab.Screen name="TabDirect" component={ HomeScreen }/>
  </DrawerTab.Navigator>
)
