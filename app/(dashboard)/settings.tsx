import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import Spacer from '@/components/ui/Spacer';
import React from 'react';
import ResetPopup from '@/components/custom/alert-window/reset-popup';
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout';
import HeaderTitle from '@/components/custom/navigation/header-title';

const SettingsPage = () => {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen />
      <HeaderTitle
        title='Tietoja Sovelluksesta'
        containerStyle={{ paddingTop: insets.top }}
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollMargin}>

          <Spacer height={10} />
          <View style={styles.content}>

            <Text style={styles.title2}>
              Tietosuoja
            </Text>

            <Text style={styles.text}>
              ADHD Tyyppitesti toimii täysin paikallisesti omalla laitteellasi.
              Emme kerää, tallenna tai lähetä mitään henkilötietoja palvelimille.
              Kaikki testivastaukset ja testitulokset pysyvät vain sinun puhelimessasi.
              Sovellus ei käytä analytiikkaa, evästeitä, seurantaa tai kolmansien osapuolten SDK:ita.
              RSS-näkymä näyttää kutri.net-blogin uusimmat artikkelit, mutta ei lähetä tai jaa tietoja sinusta kenellekään.
              Voit poistaa kaikki tiedot poistamalla sovelluksen.
              Lue koko tietosuojailmoitus <Text style={styles.link} onPress={() => router.push('https://kutri.net/adhd-app-privacy-policy/')}>täältä</Text>
            </Text>


            <Spacer height={45} />

            <Text style={styles.title2}>
              Sovelluksesta
            </Text>
            <Text style={styles.text}>
              Sovelluksen sisältö, testit ja ADHD-tyyppikuvaukset ovat yleistä informaatiota eivätkä korvaa terveydenhuollon ammattilaisen arviota.
              Sovellus ei arvioi käyttäjän terveydentilaa eikä tee hoitosuosituksia.
              Jos epäilet itselläsi ADHD:ta tai muita neuropsykiatrisia haasteita,
              suosittelemme ottamaan yhteyttä terveydenhuollon ammattilaisiin.
            </Text>
            <Spacer height={45} />

            <View style={styles.resetContainer}>
              <Text style={styles.title2}>
                Voit poistaa tiedot sovelluksesta alla olevalla painikkeella:
              </Text>
              <Spacer height={20} />
              <ResetPopup
                btnStyle={styles.resetBtn}
                txtStyle={styles.resetLabel} />
              <Spacer height={20} />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default SettingsPage

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: KUTRI_COLORS.background,
  },
  title: {
    backgroundColor: KUTRI_COLORS.foreground,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: KUTRI_COLORS.cardForeground,
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollMargin: {
    marginHorizontal: APP_HORIZONTAL_MARGIN,
    paddingHorizontal: APP_HORIZONTAL_SCROLL_PADDING,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: KUTRI_COLORS.foreground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: KUTRI_COLORS.cardForeground,
    padding: '5%'
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    lineHeight: 28,
  },
  link: {
    fontWeight: 'bold',
    fontSize: 18,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  resetContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetBtn: {
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: KUTRI_COLORS.warining,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: KUTRI_COLORS.cardForeground,
  },
  resetLabel: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  }
});
