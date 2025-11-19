import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';

import Spacer from '@/components/ui/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Index page. Redirects to home if test has been completed
export default function Screen() {

  const router = useRouter();
  const testCompleted = useTestCompleted();

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        try {
          const val = await AsyncStorage.getItem('testCompleted');
          if (!mounted) return;
          if (val === 'true') {
            router.replace('/home');
          }
        } catch (e) {
          console.log(e);
        }
      })();

      return () => { mounted = false; };
    }, [router])
  );

  // TODO: Add loading screen
  if (testCompleted == null) return null;
  if (testCompleted === true) return null;

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Starting Page</Text>

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
