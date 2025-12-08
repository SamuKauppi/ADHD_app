import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';
import { KUTRI_COLORS } from '@/lib/brand-colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import RssList from '@/components/custom/rss/rss-list';
import { APP_HORIZONTAL_MARGIN } from '@/lib/layout';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';

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
      <NavbarStyle/>
      <HeaderTitle
        title='TERVETULOA'
      />
      <View style={styles.container}>
        <View style={styles.inner}>

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
  },
  text: {
    fontSize: 16,
  },
  inner: {
    paddingHorizontal: APP_HORIZONTAL_MARGIN,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  }
});
