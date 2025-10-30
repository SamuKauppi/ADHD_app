import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Spacer from '@/components/ui/Spacer';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_OPTIONS = {
  title: 'Home',
  headerTransparent: true
};

export default function Screen() {

  const router = useRouter()

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>ADHD app</Text>

        <Spacer height={50} />

        <Text>This is a starter template for building React Native apps with reusable components.</Text>

        <Spacer />

        <Button
          style={styles.button}
          onPress={() => router.push('/test')}>
          <Text>Test</Text>
        </Button>

        <Spacer height={20} />

        <Button
          style={styles.button}
          onPress={() => router.push('/result')}>
          <Text>Result</Text>
        </Button>

        <Spacer height={20} />

        <Button
          style={styles.button}
          onPress={async () => {
            try{
              await AsyncStorage.clear();
              console.log('AsyncStorage cleared');
            } catch {
              console.log('Failed to clear AsyncStorage');
            }
          }}>
          <Text>Reset data</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 50,
    width: '60%'
  }
});
