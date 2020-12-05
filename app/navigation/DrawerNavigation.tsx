import React from 'react'
import {  DriverTabParamsList } from '../types'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../screens/Home/HomeScreen'

const DrawerTab = createDrawerNavigator<DriverTabParamsList>()


export const HomeNavigator = () => (
  <DrawerTab.Navigator
    screenOptions={ {gestureEnabled: false} }>
    <DrawerTab.Screen name="TabDirect" component={ HomeScreen }/>
  </DrawerTab.Navigator>
)
