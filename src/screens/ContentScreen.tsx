import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import { getContent } from '../api/contentApi';
import { useApiCall } from '../hooks/useApiCall';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// ✅ Define UserCard component (below or above ContentScreen)
const UserCard = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.picture.thumbnail }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>
          {user.name.first} {user.name.last}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
    </View>
  );
};

const ContentScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://randomuser.me/api/?results=10');
      const jsonData = await res.json();
      setData(jsonData.results);
    };
    fetchData();
  }, []);

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
    <FlatList
      data={data}
      keyExtractor={item => item.login.uuid}
      renderItem={({ item }) => <UserCard user={item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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
  card: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  email: {
    color: '#666',
    fontSize: 13,
    marginTop: 2,
  },
});

export default ContentScreen;
