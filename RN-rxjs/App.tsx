import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { Provide, createState } from './src/state/RXState'
import reducer$ from './src/reducers'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
    Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
  }, [])
  // const _handleNotification = notification => {
  //   this.setState({ notification: notification });
  //   };

  const _handleNotificationResponse = response => {
    console.log(response);
    };
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provide state$={createState(reducer$)}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </Provide>

      </SafeAreaProvider>
    );
  }
}

