import { StyleSheet, View, Text } from 'react-native'
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_TOTAL_MARGIN } from '@/lib/layout'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '@/components/custom/navigation/button'
import HeaderTitle from '@/components/custom/navigation/header-title'
import NavbarStyle from '@/components/custom/hooks/navbar-style'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import Spacer from '@/components/ui/Spacer'

// Page to start a new test
const TestAgain = () => {

  const handleRestartTest = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();

      // Only remove live answers, not final results or testCompleted
      const answerKeys = keys.filter(
        key => key.includes(':') && !key.startsWith('finalResult:')
      );

      if (answerKeys.length > 0) {
        await AsyncStorage.multiRemove(answerKeys);
      }

      // Do NOT remove testCompleted or finalResult keys
      // This preserves previous results for the result page

      router.push('/test');
    } catch (err) {
      console.warn('Failed to clear previous test answers', err);
    }
  };

  return (
    <>
      <NavbarStyle />
      <HeaderTitle title='TESTAA UUDELLEEN' />
      <View style={styles.inner}>
        <Text style={styles.description}>
          Haluatko aloittaa testin alusta?
        </Text>
        
        <Text style={styles.description}>
          Aiemmat testitulokset säilyy vaikka et tekisi testiä loppuun
        </Text>
        <Spacer height={10}/>
        <Button
          onPress={handleRestartTest}
          text='Testaa uudelleen' 
          color={KUTRI_COLORS.foreground}
          textStyle={styles.btnText}
          style={{width: 200, height: 60}}
          contentStyle={{borderWidth: 1}}
        />
      </View>
    </>
  )
}

export default TestAgain

const styles = StyleSheet.create({
  inner: {
    width: '100%',
    paddingHorizontal: APP_HORIZONTAL_TOTAL_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: KUTRI_COLORS.background,
  },
  description: {
    fontSize: 16,
    color: KUTRI_COLORS.text,
    textAlign: 'left',
    width: '100%'
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
})
