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
    const fetchAndSetToken = async () => {
      try {
        if (!token) {
          const newToken = await generateToken();
          await saveToken(newToken);
          setAuthToken(newToken);
        } else {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('❌ Token setup failed:', error);
      }
    };

    if (!tokenLoading) {
      fetchAndSetToken();
    }
  }, [token, tokenLoading]);

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
