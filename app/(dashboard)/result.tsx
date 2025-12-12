import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { BORDER_COLOR, SCROLLVIEW_HORIZONTAL_MARGIN , SCROLL_CONTENT_HORIZONTAL_MARGIN  } from '@/lib/layout';
import { Linking } from 'react-native';

import ResultGroup from '@/components/custom/result/result-group';
import Spacer from '@/components/ui/Spacer';
import ShareResultButton from '@/components/custom/share-button/share-button';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';

// Loads and displays results from AsyncStorage
const ResultPage = () => {
  const testCompleted = useTestCompleted();
  if (testCompleted === null) {
    return null; // loading
  }

  return (
    <>
      <NavbarStyle />
      <HeaderTitle title="TULOKSET"/>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Spacer height={10} />
          <View style={styles.scrollMargin}>
            {testCompleted ? (
              <>
                <View style={styles.subtitleContainer}>
                  <Text style={styles.subtitle}>
                    Alla näet miten paljon sinussa on eri ADHD-tyyppien piirteitä. On täysin normaalia, että saat useammasta tyypistä täydet pisteet.
                  </Text>
                  <Spacer height={10} />
                  <Text style={styles.subtitle}>
                    Klikkaamalla eri tyyppejä voit lukea lisää tietoa kyseisestä tyypistä.
                  </Text>
                </View>
                <Spacer height={10} />

                <ResultGroup />

                <View style={styles.subtitleContainer}>
                  <Text style={[styles.subtitle, styles.subtitleBold]}>Yllättivätkö testin tulokset?</Text>
                  <Text style={styles.subtitle}>Jaa ajatuksesi ja testi kaverin kanssa.</Text>
                  <Text style={styles.subtitle}>Halutessasi merkitse Katri postaukseen tunnuksella @kutrinet</Text>
                </View>
                <Spacer height={10} />

                <View style={styles.shareContainer}>
                  <ShareResultButton />
                </View>
                <Spacer height={10} />

                <View style={styles.subtitleContainer}>
                  <Text style={[styles.subtitle, styles.subtitleBold]}>
                    Haluatko oppia hallitsemaan omaa ADHD:ta?
                  </Text>
                  <Text style={styles.subtitle}>
                    On kiva tietää oma ADHD-tyyppi - mutta se ei vielä siivoa kaaosta kalenterista tai keittiöstä.
                  </Text>
                  <Text style={styles.subtitle}>
                    Kutri.net:in ilmainen ADHD-jäsenyys tarjoaa vertaistukea ja webinaareja.
                  </Text>
                  <Text style={styles.subtitle}>
                    ADHD haltuun -puuhakirja selittää ymmärrettävästi aivojesi toimintaa ja antaa vinkkejä ja työkaluja omien oireiden hallintaan.
                  </Text>
                  <Text style={[styles.subtitle, { fontWeight: 'bold' }]}>
                    Lue kummastakin lisää täältä:
                  </Text>
                  <Text style={[styles.subtitle, { color: 'blue' }]} onPress={() => Linking.openURL('https://kutri.net/ADHD')}>
                    kutri.net/ADHD
                  </Text>
                </View>
                <Spacer height={10} />
              </>
            ) : (
              <Text style={styles.subtitle}>
                Testi dataa ei löytynyt. Suorita testi, jotta näet tulokset
              </Text>
            )}
          </View>
          <Spacer height={10} />
        </ScrollView>
      </View>
    </>
  );
};

export default ResultPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: KUTRI_COLORS.background,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: SCROLLVIEW_HORIZONTAL_MARGIN ,
  },
  scrollMargin: {
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN ,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  shareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  subtitleContainer: {
    width: '100%',
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: KUTRI_COLORS.foreground,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRadius: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
  },
  subtitleBold: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
