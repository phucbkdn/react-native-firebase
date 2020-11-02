import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  setNotificationHandler,
  addNotificationResponseReceivedListener
} from 'expo-notifications';
import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { Provide, createState } from './src/state/RXState'
import { AuthProvider } from './src/provider'
import reducer$ from './src/reducers'
import {decode, encode} from 'base-64'
import ErrorBoundary from './src/components/ErrorBoundary'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// Ignore log setting a time on android devices
LogBox.ignoreLogs(['Setting a timer'])

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, [])

  // TODO: update handle notification
  const _handleNotificationResponse = response => {
    console.log('Notifications:', response);
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ErrorBoundary>
        <SafeAreaProvider>
          <Provide state$={createState(reducer$)}>
            <AuthProvider>
              <Navigation />
            <StatusBar />
            </AuthProvider>
          </Provide>
        </SafeAreaProvider>
      </ErrorBoundary>
    );
  }
}
