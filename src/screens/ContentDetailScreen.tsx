import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const ContentDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { content } = route.params;

  return (
    <View style={{ flex: 1 }}>
      {/* Header with plain text cross icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 16 }}>
        <Image
          source={{ uri: content.mainImage }}
          style={{ height: 250, borderRadius: 12 }}
        />
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subTitle}</Text>
        <Text style={styles.author}>By {content.userName}</Text>

        {/* Render HTML text as plain string */}
        <Text style={styles.bodyText}>
          {content.text.replace(/<[^>]+>/g, '')}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    alignItems: 'flex-end',
  },
  closeText: {
    fontSize: 26,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
  },
  author: {
    marginTop: 16,
    fontStyle: 'italic',
  },
  bodyText: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
  },
});

export default ContentDetailScreen;
