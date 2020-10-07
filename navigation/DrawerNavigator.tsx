import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppInfoScreen from '../screens/AppInfoScreen'
import Users from '../screens/Users'
import Messages from '../screens/Messages'

const Drawer = createDrawerNavigator()

export default function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="DrawerHome">
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="AppInfo" component={AppInfoScreen} />
    </Drawer.Navigator>
  )
}
