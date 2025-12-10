import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { useCallback } from 'react';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { APP_HORIZONTAL_TOTAL_MARGIN } from '@/lib/layout';

import HeaderTitle from '@/components/custom/navigation/header-title';
import Button from '@/components/custom/navigation/button';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import IconButton from '@/components/custom/navigation/icon-button';
import Spacer from '@/components/ui/Spacer';

// Index page. Redirects to home if test has been completed
export default function Screen() {

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const testCompleted = useTestCompleted();

  useFocusEffect(
    useCallback(() => {
      if (testCompleted === null) return;

      if (testCompleted === true) {
        // Test already completed → go to home
        while (router.canGoBack()) {
          router.back();
        }
        router.replace('/home');
      }
    }, [testCompleted])
  );

  // While loading or redirecting, show nothing
  if (testCompleted === null || testCompleted === true) return null;


  // Test has not been completed, show page
  return (
    <>
      <Stack.Screen />
      <HeaderTitle />
      <NavbarStyle buttonStyle='dark' />
      <View
        style={[
          styles.container,
        ]}
      >
        <View style={[styles.content, {
          paddingBottom: insets.bottom,
        },]}>
          <IconButton
            iconName="cover"
            imgStyle={styles.image}
          />

          <ScrollView style={styles.scollView}>
            <Text style={styles.title}>Selvitä oma ADHD-tyyppisi</Text>

            <Text style={styles.paragraph}>
              ADHD:n eli tarkkaavuushäiriön takana on joukko erilaisia aivotoiminnan poikkeamia.
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
              <Spacer height={30} />
              <Text
                style={[styles.paragraph, { textDecorationLine: 'underline', color: 'blue' }]}
                onPress={() => router.push('/about')}
              >
                Tietoa sovelluksesta
              </Text>

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
