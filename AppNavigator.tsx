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
        {/* Main content list screen */}
        <Stack.Screen name="contentlist" component={Contentscreen} />

        {/* Content details screen, shown on item tap */}
        <Stack.Screen name="contentdetails" component={ContentDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
