import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { APP_HORIZONTAL_TOTAL_MARGIN } from '@/lib/layout';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTitle from '@/components/custom/navigation/header-title';
import Button from '@/components/custom/navigation/button';

// Index page. Redirects to home if test has been completed
export default function Screen() {

  const router = useRouter();
  const testCompleted = useTestCompleted();
  const insets = useSafeAreaInsets();

  // Confirm that test has not been done
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

  if (testCompleted == null) return null;
  if (testCompleted === true) return null;

  // Test has not been completed, show page
  return (
    <>
      <Stack.Screen />
      <HeaderTitle />
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
          },
        ]}
      >
        <View style={styles.content}>
          <Image source={require('../assets/images/adhdtyypit_appiin.png')} style={styles.image} />

          <ScrollView style={styles.scollView}>
            <Text style={styles.title}>Selvitä oma ADHD-tyyppisi</Text>

            <Text style={styles.paragraph}>
              ADHD:n eli tarkkaavuushäiriön takana on joukko erilaisia aivotoiminnan poikkeamia.
            </Text>

            <Text style={styles.paragraph}>
              Ne voidaan jakaa karkeasti viiteen eri tyyppiin.
            </Text>

            <Text style={styles.paragraph}>
              Viisi ADHD-tyyppiä teksti auttaa sinua selvittämään, millä kaikilla tavoilla oma tarkkaavuushäiriösi ehkä ilmenee ja mistä se johtuu.
            </Text>

            <Text style={styles.paragraph}>
              Valitse vastausvaihtoehdoista kaikki ne, jotka tunnistat itsessäsi. Useimmat ADHD-ihmiset tunnistavat itsessään 2–5 eri tyyppiä.
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                text="ALOITA TESTI"
                onPress={() => router.push('/test')}
                color={KUTRI_COLORS.button}
                pressedColor={KUTRI_COLORS.buttonHighlight}
                style={styles.button}
                textStyle={styles.buttonText}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  },
  content: {
    marginHorizontal: APP_HORIZONTAL_TOTAL_MARGIN
  },
  scollView: {
    backgroundColor: KUTRI_COLORS.foreground,
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 512 / 392,   // ≈1.306
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    width: '60%',
    borderColor: KUTRI_COLORS.cardForeground
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  }
});
