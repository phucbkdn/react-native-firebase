import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  setNotificationHandler,
  addNotificationResponseReceivedListener
} from 'expo-notifications';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Provide, createState } from './src/state/RXState'
import { AuthProvider } from './src/provider'
import reducer$ from './src/reducers'

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, [])

  const _handleNotificationResponse = response => {
    console.log('Notifications:', response);
    };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provide state$={createState(reducer$)}>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
          <StatusBar />
          </AuthProvider>
        </Provide>

      </SafeAreaProvider>
    );
  }
}

