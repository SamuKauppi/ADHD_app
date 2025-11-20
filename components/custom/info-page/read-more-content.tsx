// components/custom/read-more-content.tsx
import React from 'react';
import { View, Pressable, Linking, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';

export interface ReadMoreData {
  title: string;
  text: string[];
  link?: string;
}

interface ReadMoreContentProps {
  data: ReadMoreData;
}


// Read more content
const ReadMoreContent = ({data}: ReadMoreContentProps) => {

  const openLink = async (url?: string) => {
    if (!url) return; // narrows url to string
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        // fallback: log or show a toast — implement app-specific feedback
        console.warn('Cannot open URL:', url);
      }
    } catch (err) {
      console.warn('Failed to open URL:', err);
    }
  };

  return (
    <View>
      <Text style={styles.title}>{data.title}</Text>

      <View>
        {data.text.map((line: string, idx: number) => {
          const isLastLine = idx === data.text.length - 1;
          if (isLastLine && data.link) {
            return (
              <Pressable
                key={idx}
                onPress={() => void openLink(data.link)}
                accessibilityRole="link"
              >
                <Text style={styles.linkText}>{line}</Text>
              </Pressable>
            );
          }

          return (
            <Text key={idx} style={styles.text}>
              {line}
            </Text>
          );
        })}
      </View>

    </View>
  );
};

export default ReadMoreContent;

const styles = StyleSheet.create({
  title: { marginBottom: 20, fontWeight: 'bold', fontSize: 28, lineHeight: 32 },
  text: { marginBottom: 16, fontSize: 20, lineHeight: 26 },
  linkText: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 26,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
