import { StyleSheet, ScrollView, View } from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';

import ResultGroup from '@/components/custom/result/result-group';
import Spacer from '@/components/ui/Spacer';
import ShareResultButton from '@/components/custom/share-button/share-button';

// Loads and displays results from AsyncStorage
const ResultPage = () => {
  const testCompleted = useTestCompleted();

  if (testCompleted === null) {
    return null; // loading
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.scrollMargin}>
            {testCompleted ? (
              <>
                <ResultGroup style={styles.resultGroupContainer} />
                <Spacer height={20} />
                <View style={styles.shareContainer}>
                  <ShareResultButton/>
                </View>
              </>
            ) : (
              <Text>No test data available. Please complete the test first.</Text>
            )}

          </View>
        </ScrollView>
      </SafeAreaView>
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
    width: '98%',
  },
  scrollMargin: {
    paddingTop: 30,
    marginHorizontal: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  resultGroupContainer: {
    width: '90%',
  },
  shareContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

});
