import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { getContent } from '../api/contentApi';
import { useApiCall } from '../hooks/useApiCall';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ContentScreen = () => {
  const navigation = useNavigation();
  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApiCall({ call: getContent });

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading content...</Text>
      </View>
    );
  }

  if (error || !content) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 12 }}>
          ❌ Failed to fetch content
        </Text>
        <Pressable style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshText}>REFRESH</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header with date and VS */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>{formattedDate.toUpperCase()}</Text>
          <Text style={styles.headerTitle}>Today</Text>
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
      </View>

      {/* Hero Image */}
      <TouchableOpacity
        onPress={() => navigation.navigate('contentdetails', { content })}
        style={styles.heroWrapper}
        activeOpacity={0.8}
      >
        <Image source={{ uri: content.mainImage }} style={styles.mainImage} />
      </TouchableOpacity>

      {/* Floating Card */}
      <View style={styles.card}>
        <Image source={{ uri: content.logo }} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{content.title}</Text>
          <Text style={styles.subtitle}>{content.subTitle}</Text>
        </View>
        <Pressable style={styles.refreshButton} onPress={refetch}>
          <Text style={styles.refreshText}>REFRESH</Text>
        </Pressable>
      </View>

      <Text style={styles.inAppText}>In-App Purchase</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  headerSub: {
    fontSize: 12,
    color: '#999',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '900',
    marginTop: 2,
    color: '#000',
  },
  vsContainer: {
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  vsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  heroWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 12,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  refreshButton: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  refreshText: {
    fontWeight: '700',
    color: '#3b82f6',
    fontSize: 12,
  },
  inAppText: {
    textAlign: 'right',
    marginTop: 8,
    color: '#999',
    fontSize: 11,
  },
});

export default ContentScreen;
