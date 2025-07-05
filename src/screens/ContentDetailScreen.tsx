import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Content } from '../types/content';

const ContentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const content = route.params?.content as Content;

  const cleanText = content.text
    .replace(/<\/?[^>]+(>|$)/g, '') // Strip HTML tags
    .replace(/\n/g, '\n\n');

  return (
    <ScrollView style={styles.container}>
      {/* Fullscreen Image */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: content.mainImage }} style={styles.mainImage} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.overlayText}>Only I Can Call My Dream Stupid.</Text>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={{ uri: content.logo }} style={styles.logo} />
          <View style={styles.meta}>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>Set sail for One Piece!</Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn} onPress={() => {}}>
            <Text style={styles.refreshText}>REFRESH</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.description}>{cleanText}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  imageWrapper: { position: 'relative' },
  mainImage: { width: '100%', height: 300 },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#0007',
    padding: 6,
    borderRadius: 14,
  },
  closeText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  overlayText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  logo: { width: 48, height: 48, borderRadius: 10 },
  meta: { flex: 1, marginLeft: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: 'gray', fontSize: 14 },
  refreshBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  refreshText: { fontWeight: 'bold', fontSize: 12 },
  description: { marginTop: 12, fontSize: 15, lineHeight: 22 },
});

export default ContentDetailScreen;
