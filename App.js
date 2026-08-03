import React, { useEffect } from 'react';
import { NativeModules, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import notifee, { EventType } from '@notifee/react-native';

import { navigationRef, navigate } from './src/navigation/RootNavigation';
import AppNavigator from './src/navigation/AppNavigator';
import { AlarmProvider } from './src/context/AlarmContext';
import NotificationService from './src/services/NotificationService';

const App = () => {

  useEffect(() => {

    NotificationService.requestPermission();
    NotificationService.createChannel();

    const checkAlarmOpen = async () => {
      const result = await NativeModules.AlarmStorage?.checkAlarm();

      if (result) {
        setTimeout(() => {
          navigate('AlarmScreen');
        }, 500);
      }
    };

    checkAlarmOpen();

    const appStateSubscription = AppState.addEventListener(
      'change',
      async state => {
        if (state === 'active') {
          const result =
            await NativeModules.AlarmStorage?.checkAlarm();

          if (result) {
            navigate('AlarmScreen');
          }
        }
      }
    );

    const notifeeSubscription =
      notifee.onForegroundEvent(({ type }) => {
        if (type === EventType.PRESS) {
          navigate('AlarmScreen');
        }
      });

    return () => {
      appStateSubscription.remove();
      notifeeSubscription();
    };

  }, []);

  return (
    <AlarmProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
    </AlarmProvider>
  );
};

export default App;