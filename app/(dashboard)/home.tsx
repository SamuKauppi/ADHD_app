import Button from '@/components/custom/generic/button';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';

import Spacer from '@/components/ui/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RssList from '@/components/custom/rss/rss-list';
import { KUTRI_COLORS } from '@/lib/brand-colors';

// Home screen. Redirects to Index if test is not complete
const Home = () => {

  const router = useRouter();
  const testCompleted = useTestCompleted();

  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      (async () => {
        try {
          const val = await AsyncStorage.getItem('testCompleted');
          if (!mounted) return;
          if (val === 'false') {
            router.replace('/');
          }
        } catch (e) {
          console.log(e);
        }
      })();

      return () => { mounted = false; };
    }, [router])
  );

  // TODO: add loading screen
  if (testCompleted === null) return null;
  if (testCompleted === false) return null;

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Home page</Text>

        <Spacer height={50} />

        <RssList url="https://kutri.net/osiot/adhd/feed/" limit={5} />          

      </SafeAreaView>
    </>
  );
}

export default Home

const styles = StyleSheet.create({
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  }
});
