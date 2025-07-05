import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { getContent } from '../api/contentApi';
import { useApiCall } from '../hooks/useApiCall';
import { useNavigation } from '@react-navigation/native';

const ContentScreen = () => {
  const navigation = useNavigation();
  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApiCall({
    call: getContent,
  });

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading content...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 12 }}>
          ❌ Failed to fetch content
        </Text>
        <Button title="Try Again" onPress={refetch} />
      </View>
    );
  }

  if (!content) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text>No content found</Text>
        <Button title="Refresh" onPress={refetch} />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('contentdetails', { content })}
      >
        <Image
          source={{ uri: content.mainImage }}
          style={{ height: 250, borderRadius: 12 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 12,
        }}
      >
        {content.title}
      </Text>
      <Text style={{ fontSize: 16, color: 'gray' }}>{content.subTitle}</Text>
      <Text style={{ marginTop: 16, fontStyle: 'italic' }}>
        By {content.userName}
      </Text>

      <View style={{ marginTop: 24 }}>
        <Button title="Refresh Content" onPress={refetch} />
      </View>
    </ScrollView>
  );
};

export default ContentScreen;
