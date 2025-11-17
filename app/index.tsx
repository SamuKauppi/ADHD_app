import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Spacer from '@/components/ui/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTestCompleted } from '@/components/custom/use-test-completed';
import { useEffect } from 'react';

export default function Screen() {

  const router = useRouter();
  const testCompleted = useTestCompleted();

  useEffect(() => {
    if (testCompleted) {
      router.replace('/home');
    }
  }, [testCompleted]);


  if (testCompleted === null) {
    return null; // loading
  }

  if (testCompleted === true) {
    return null; // redirect handled above
  }

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Devpage</Text>

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
            try {
              await AsyncStorage.clear();
              console.log('AsyncStorage cleared');
            } catch {
              console.log('Failed to clear AsyncStorage');
            }
          }}>
          <Text>Reset data</Text>
        </Button>

        <Spacer height={20} />

        <Button
          style={styles.button}
          onPress={() => router.push('/info')}>
          <Text>Test type</Text>
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
