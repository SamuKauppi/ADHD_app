import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

import Spacer from '@/components/ui/Spacer';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SCREEN_OPTIONS = {
  title: 'Home',
  headerTransparent: true
};

export default function Screen() {

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View style={styles.container}>
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
      </View>
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
