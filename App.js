import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initSync } from './src/database/db';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import { saveMessage } from './src/database/db';

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
          initSync();

                  // Notification listener setup
                  const handleNotification = (notification) => {
                          if (notification) {
                                    const { app, title, text } = notification;
                                    if (app === 'com.whatsapp' || app === 'com.whatsapp.w4b') {
                                                const whatsappType = app === 'com.whatsapp' ? 'PERSONAL' : 'BUSINESS';
                                                saveMessage(title, text, 'TEXT', whatsappType);
                                    }
                          }
                  };

                  RNAndroidNotificationListener.getPermissionStatus().then(status => {
                          console.log('Notification permission status:', status);
                  });

    }, []);

  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'WhatsSave' }} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} options={({ route }) => ({ title: route.params.chatId })} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
  </NavigationContainer>
  );
}
