import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout';

import ResultGroup from '@/components/custom/result/result-group';
import Spacer from '@/components/ui/Spacer';
import ShareResultButton from '@/components/custom/share-button/share-button';
import HeaderTitle from '@/components/custom/navigation/header-title';

// Loads and displays results from AsyncStorage
const ResultPage = () => {
  const testCompleted = useTestCompleted();
  const insets = useSafeAreaInsets();

  if (testCompleted === null) {
    return null; // loading
  }

  return (
    <>
    <HeaderTitle 
    title='Tulokset'
    containerStyle={{paddingTop: insets.top}}
    />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Spacer height={10}/>
          <View style={styles.scrollMargin}>
            {testCompleted ? (
              <>
                <ResultGroup style={styles.resultGroupContainer} />

                <Spacer height={20} />
                <View style={styles.shareContainer}>
                  <ShareResultButton />
                </View>
              </>
            ) : (
              <Text>Testi dataa ei löytynyt. Suorita testi, jotta näet tulokset</Text>
            )}

          </View>
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
    width: '100%',
    paddingHorizontal: APP_HORIZONTAL_SCROLL_PADDING
  },
  scrollMargin: {
    marginHorizontal: APP_HORIZONTAL_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  resultGroupContainer: {
    width: '100%',
  },
  shareContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContariner: {
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 40,
    textAlign: 'left',
  },
  extraText: {
    marginBottom: 20,
    marginTop: 5,
    fontSize: 18,
    textAlign: 'left',
  },
});
