import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiCall } from '../hooks/useApiCall';
import { getContent } from '../api/contentApi';

const ContentDetailScreen = () => {
  const navigation = useNavigation();

  const {
    data: content,
    loading,
    error,
    refetch,
  } = useApiCall({ call: getContent });

  const handleShare = async content => {
    try {
      const result = await Share.share({
        title: content.title,
        message: `Check out this anime: ${content.title} - ${content.subTitle}\n\n${content.mainImage}`,
      });

      if (result.action === Share.sharedAction) {
        console.log('Shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed.');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>Loading content...</Text>
      </View>
    );
  }

  if (error || !content) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: 'red', fontSize: 16, marginBottom: 12 }}>
          ❌ Failed to fetch content
        </Text>
        <TouchableOpacity style={styles.refreshBtn} onPress={refetch}>
          <Text style={styles.refreshText}>REFRESH</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Clean HTML and split into paragraphs
  const paragraphs = content.text
    .split(/<\/p>/i)
    .map(p => p.replace(/<\/?[^>]+(>|$)/g, '').trim())
    .filter(Boolean);

  const cleanText = paragraphs.join('\n\n');

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
            <Text style={styles.subtitle}>
              {content.subTitle || 'Set sail for One Piece!'}
            </Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.refreshBtn} onPress={refetch}>
              <Text style={styles.refreshText}>REFRESH</Text>
            </TouchableOpacity>
            <Text style={styles.inAppText}>In-App Purchase</Text>
          </View>
        </View>

        <Text style={styles.description}>{cleanText}</Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => handleShare(content)}
      >
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: { width: 48, height: 48, borderRadius: 10 },
  meta: { flex: 1, marginLeft: 12 },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: 'gray', fontSize: 14 },
  actions: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  refreshBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  refreshText: { fontWeight: 'bold', fontSize: 12, color: '#3b82f6' },
  inAppText: {
    marginTop: 4,
    fontSize: 11,
    color: '#999',
  },
  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  shareButton: {
    backgroundColor: '#3b82f6',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContentDetailScreen;
