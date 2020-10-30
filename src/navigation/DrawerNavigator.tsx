import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppInfoScreen from '../screens/AppInfoScreen'
import Users from '../screens/Users'
import Settings from '../screens/Settings'

const Drawer = createDrawerNavigator()

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="AppInfo" component={AppInfoScreen} />
    </Drawer.Navigator>
  )
}
