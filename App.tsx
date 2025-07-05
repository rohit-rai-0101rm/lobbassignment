import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from './AppNavigator';

import { generateToken } from './src/api/authApi';
import { setAuthToken } from './src/api/apiClient';
import { useAsyncStorage } from './src/hooks/useAsyncStorage';

const App = () => {
  const {
    value: token,
    save: saveToken,
    loading: tokenLoading,
  } = useAsyncStorage<string | null>('USER_AUTH_TOKEN', null);

  useEffect(() => {
    console.log(
      '🌀 useEffect triggered | token:',
      token,
      '| loading:',
      tokenLoading,
    );

    const fetchAndSetToken = async () => {
      try {
        if (!token) {
          console.log('📡 Fetching new token...');
          const newToken = await generateToken(); // Generate new token
          await saveToken(newToken); // Save to AsyncStorage
          setAuthToken(newToken); // Set in axios headers
          console.log('✅ New token saved and set:', newToken);
        } else {
          setAuthToken(token); // Set existing token
          console.log('🗂️ Token already exists. Set in headers:', token);
        }
      } catch (error) {
        console.error('❌ Token setup failed:', error);
      }
    };

    if (!tokenLoading) {
      fetchAndSetToken();
    }
  }, [token, tokenLoading]); // ✅ include both as dependencies

  console.log('🌱 Render | token:', token, '| loading:', tokenLoading);

  if (tokenLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator />;
};

export default App;
