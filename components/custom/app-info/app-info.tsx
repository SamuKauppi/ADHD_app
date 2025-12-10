import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import Spacer from '@/components/ui/Spacer';

const AppInfo = ({ showReset }: { showReset?: boolean }) => {
  const router = useRouter();

  return (
    <View>
      <Text style={styles.title2}>Tietosuoja</Text>
      <Text style={styles.text}>
        ADHD Tyyppitesti toimii täysin paikallisesti omalla laitteellasi.
        Emme kerää, tallenna tai lähetä mitään henkilötietoja palvelimille.
        Kaikki testivastaukset ja testitulokset pysyvät vain sinun puhelimessasi.
        Sovellus ei käytä analytiikkaa, evästeitä, seurantaa tai kolmansien osapuolten SDK:ita.
        RSS-näkymä näyttää kutri.net-blogin uusimmat artikkelit, mutta ei lähetä tai jaa tietoja sinusta kenellekään.
        Voit poistaa kaikki tiedot poistamalla sovelluksen.
        Lue koko tietosuojailmoitus{' '}
        <Text style={styles.link} onPress={() => router.push('https://kutri.net/adhd-app-privacy-policy/')}>
          täältä
        </Text>
      </Text>

      <Spacer height={45} />

      <Text style={styles.title2}>Sovelluksesta</Text>
      <Text style={styles.text}>
        Sovelluksen sisältö, testit ja ADHD-tyyppikuvaukset ovat yleistä informaatiota eivätkä korvaa terveydenhuollon ammattilaisen arviota.
        Sovellus ei arvioi käyttäjän terveydentilaa eikä tee hoitosuosituksia.
        Jos epäilet itselläsi ADHD:ta tai muita neuropsykiatrisia haasteita,
        suosittelemme ottamaan yhteyttä terveydenhuollon ammattilaisiin.
      </Text>

      {showReset && (
        <>
          <Spacer height={45} />
          <Text style={styles.title2}>Voit poistaa tiedot sovelluksesta alla olevalla painikkeella:</Text>
          <Spacer height={20} />
        </>
      )}
    </View>
  );
};

export default AppInfo;

const styles = StyleSheet.create({
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
});
