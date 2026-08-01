import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import AddAlarm from '../screens/AddAlarm';
import AlarmScreen from '../screens/AlarmScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="AddAlarm" component={AddAlarm} />

      <Stack.Screen name="AlarmScreen" component={AlarmScreen} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
