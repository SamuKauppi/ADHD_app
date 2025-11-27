import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import Spacer from '@/components/ui/Spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RssList from '@/components/custom/rss/rss-list';

// Home screen. Redirects to Index if test is not complete
const Home = () => {

  const router = useRouter();
  const testCompleted = useTestCompleted();
  const insets = useSafeAreaInsets();

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
      <View style={[styles.container, {
        paddingTop: insets.top,
      }]}>
        <View style={styles.inner}>
          <Text style={styles.title}>Tervetuloa</Text>

          <Spacer height={20} />
          <Text>Alla viimeisimmät postaukset kotisivulta</Text>
          <Spacer height={20} />

          <RssList url="https://kutri.net/osiot/adhd/feed/" limit={5} />
        </View>

      </View>
    </>
  );
}

export default Home

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20
  },
  inner: {
    paddingHorizontal: '10%',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: KUTRI_COLORS.background,
  }
});
