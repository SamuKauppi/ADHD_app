import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from 'react-native-safe-area-context';

import ResultGroup from '@/components/custom/result/result-group';
import { Stack } from 'expo-router';
import Spacer from '@/components/ui/Spacer';
import ShareResultButton from '@/components/custom/share-button/share-button';
import { useTestCompleted } from '@/components/custom/hooks/use-test-completed';

// Loads and displays results from AsyncStorage
const ResultPage = () => {
  const testCompleted = useTestCompleted();

  if (testCompleted === null) {
    return null; // loading
  }

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollView}>
          <ScrollView>
            {testCompleted ? (
              <>
                <ResultGroup />
                <Spacer height={15} />
                <View style={styles.shareContainer}>
                  <ShareResultButton
                    style={styles.shareButton}
                    txtStyle={styles.shareBtnText}
                  />
                </View>
              </>
            ) : (
              <Text>No test data available. Please complete the test first.</Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};


export default ResultPage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  scrollView: {
    width: '92%',
    flex: 1,
  },
  shareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    height: 55,
    width: 200,
  },
  shareBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
