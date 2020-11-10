import React, { useContext, useRef } from 'react'
import * as Linking from 'expo-linking'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigationState,
  PartialState,
  NavigationContainerRef,
  getStateFromPath,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../models'
import DrawerScreen from './DrawerNavigator'

// Screens
import Messages from '../screens/Messages'
import NotFoundScreen from '../screens/NotFoundScreen'
import LoginScreen from '../screens/Login'

// Components
import Indicator from '../components/IndicatorBackdrop'

// Store, provider
import { AuthUserContext } from '../provider'
import { authStateChange } from '../hooks/useAuthStateChange'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation() {
  const { theme } = useContext(AuthUserContext)
  const getActiveRouteName = (
    state: NavigationState | PartialState<NavigationState> | undefined
  ): string => {
    if (!state || typeof state.index !== 'number') {
      return 'Unknown'
    }

    const route = state.routes[state.index]

    if (route.state) {
      return getActiveRouteName(route.state)
    }

    return route.name
  }
  const routeNameRef = useRef() as React.MutableRefObject<string | undefined>
  const navigationRef = useRef() as React.RefObject<NavigationContainerRef>

  const linkKing = {
    prefixes: [Linking.makeUrl('/')],
    config: {
      screens: {
        Users: 'users',
        Login: 'login',
        Messages: 'messages',
        NotFound: '*',
      },
    },
    getStateFromPath,
    getPathFromState(state, config) {
      if (!state || typeof state.index !== 'number') {
        return 'NotFound'
      }

      const route = state.routes[state.index]

      if (route.state) {
        return getActiveRouteName(route.state)
      }

      return route.name
    },
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name)
      }
      linking={linkKing}
      theme={theme === 'dark' ? DarkTheme : DefaultTheme}
      onStateChange={() => {
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name
        routeNameRef.current = currentRouteName
      }}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

export const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="primaryStack"
      component={DrawerScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Messages"
      component={Messages}
      options={({ route }) => ({
        title: route.params.name,
        headerBackTitleVisible: false,
      })}
    />
    <Stack.Screen
      name="NotFound"
      component={NotFoundScreen}
      options={{ title: 'Oops!' }}
    />
  </Stack.Navigator>
)

export const AuthStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
)

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthUserContext)
  const [waitAuthCheck] = authStateChange(setUser)

  if (waitAuthCheck) {
    return <Indicator />
  }

  return user ? <AppStack /> : <AuthStack />
}

export * from './navigation.props'
