import React, { useEffect, useContext, useState } from 'react'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ColorSchemeName } from 'react-native'
import { authState } from 'rxfire/auth'
import moment from 'moment'

import { RootStackParamList } from '../models'
import LinkingConfiguration from './LinkingConfiguration'
import DrawerScreen from './DrawerNavigator'

// Screens
import Messages from '../screens/Messages'
import NotFoundScreen from '../screens/NotFoundScreen'
import TableOrder from '../screens/TableOrder'
import LoginScreen from '../screens/Login'
import firebaseApp from '../services'

// Components
import Indicator from '../components/IndicatorBackdrop'

// Store, provider
import usersStore from '../store/users'
import { AuthUserContext } from '../provider'

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

export const AppStack = () => {
  const [user, setUser] = useState('')
  useEffect(() => {
    const sub = usersStore.getStore().subscribe((it) => {
      setUser(it.user)
    })

    return () => sub.unsubscribe()
  }, [])

  return (
    <Stack.Navigator headerMode="none">
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

export const AuthStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
)

const RootNavigator = () => {
  const { user, setUser } = useContext(AuthUserContext)
  const [waitAuthCheck, setWaitAuthCheck] = useState<boolean>(true)

  useEffect(() => {
    const auth = firebaseApp.auth()
    const sub = authState(auth).subscribe((user: any) => {
      setWaitAuthCheck(false)
      setUser(user)
      if (!!user) {
        const userRef = firebaseApp.database().ref('users/' + user.uid)
        const isOfflineForDatabase = {
          state: 'offline',
          last_changed: moment().format(),
          email: user.email,
        }

        const isOnlineForDatabase = {
          state: 'online',
          last_changed: moment().format(),
          email: user.email,
        }
        firebaseApp
          .database()
          .ref('.info/connected')
          .on('value', (snapshot) => {
            if (snapshot.val() === false) {
              userRef.set(isOnlineForDatabase)
              return
            }

            userRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
                userRef.set(isOnlineForDatabase)
              })
          })
      }
    })

    return () => sub.unsubscribe()
  }, [])

  if (waitAuthCheck) {
    return <Indicator />
  }

  return user ? <AppStack /> : <AuthStack />
}

export * from './navigation.props'
