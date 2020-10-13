import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { ColorSchemeName } from 'react-native'

import NotFoundScreen from '../screens/NotFoundScreen'
import TableOrder from '../screens/TableOrder'
import LoginScreen from '../screens/Login'
import { RootStackParamList } from '../../types'
import BottomTabNavigator from './BottomTabNavigator'
import LinkingConfiguration from './LinkingConfiguration'
import DrawerScreen from './DrawerNavigator'
import Messages from '../screens/Messages'
import usersStore from '../store/users'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const sub = usersStore.getStore().subscribe((it) => {
      setUser(it.user)
    })

    return () => sub.unsubscribe()
  }, [])
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={LoginScreen} />
      <Stack.Screen name="primaryStack" component={DrawerScreen} />
      <Stack.Screen
        name="TableOrder"
        component={TableOrder}
        options={{ title: 'TableOrder' }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ title: user }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  )
}

export * from './navigation.props'
