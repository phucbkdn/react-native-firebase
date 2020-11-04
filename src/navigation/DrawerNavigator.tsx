import React from 'react'
import { useWindowDimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppInfoScreen from '../screens/AppInfoScreen'
import Users from '../screens/Users'
import Settings from '../screens/Settings'

const Drawer = createDrawerNavigator()

export default function AppDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  return (
    <Drawer.Navigator drawerType={isLargeScreen ? 'permanent' : 'back'}>
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="AppInfo" component={AppInfoScreen} />
    </Drawer.Navigator>
  )
}
