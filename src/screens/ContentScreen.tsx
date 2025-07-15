import React, { useEffect, useState } from 'react';
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api/?results=10');
      const jsonData = await res.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  // Call API to fetch content data
  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApiCall({ call: getContent });

  // Format today's date nicely
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  // Show loading spinner
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading content...</Text>
      </View>
    );
  }

  // Show error state with refresh button
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
      {/* Header with date and VS badge */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>{formattedDate.toUpperCase()}</Text>
          <Text style={styles.headerTitle}>Today</Text>
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
      </View>

      {/* Card clickable to navigate to details screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('contentdetails', { content })}
        activeOpacity={0.9}
        style={styles.cardContainer}
      >
        {/* Main hero image */}
        <Image source={{ uri: content.mainImage }} style={styles.mainImage} />

        {/* Bottom card with logo and details */}
        <View style={styles.bottomCard}>
          {/* Logo image */}
          <Image source={{ uri: content.logo }} style={styles.logo} />

          {/* Title and subtitle */}
          <View style={styles.details}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>{content.subTitle}</Text>
          </View>

          {/* Actions: Refresh button and in-app label */}
          <View style={styles.actions}>
            <Pressable style={styles.refreshButton} onPress={refetch}>
              <Text style={styles.refreshText}>REFRESH</Text>
            </Pressable>
            <Text style={styles.inAppText}>In-App Purchase</Text>
          </View>
        </View>
      </TouchableOpacity>
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
    marginBottom: 16,
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
  cardContainer: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  mainImage: {
    width: '100%',
    height: 260,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    resizeMode: 'cover',
  },
  bottomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'center',
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
    marginTop: 4,
    fontSize: 11,
    color: '#999',
  },
});

export default ContentScreen;
