// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ContentDetails, Contentscreen } from './src/screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="contentlist"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="contentlist" component={Contentscreen} />
        <Stack.Screen name="contentdetails" component={ContentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
