import React from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';
import { getContent } from '../api/contentApi';
import { useApiCall } from '../hooks/useApiCall';

const ContentScreen = () => {
  const { data: content, loading, error } = useApiCall({ call: getContent });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;
  if (!content) return <Text>No content found</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Image
        source={{ uri: content.mainImage }}
        style={{ height: 250, borderRadius: 12 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 12 }}>
        {content.title}
      </Text>
      <Text style={{ fontSize: 16, color: 'gray' }}>{content.subTitle}</Text>
      <Text style={{ marginTop: 16 }}>By {content.userName}</Text>
    </ScrollView>
  );
};

export default ContentScreen;
