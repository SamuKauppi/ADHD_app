import { StyleSheet, View, Text } from 'react-native'
import { TOTAL_MARGIN, BORDER_COLOR } from '@/lib/layout'
import { router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Button from '@/components/custom/navigation/button'
import HeaderTitle from '@/components/custom/navigation/header-title'
import NavbarStyle from '@/components/custom/hooks/navbar-style'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import Spacer from '@/components/ui/Spacer'
import IconButton from '@/components/custom/navigation/icon-button'

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
        <View style={styles.imageWrapper}>
          <IconButton
            iconName="cover"
            imgStyle={styles.image}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>
            Haluatko testata uudelleen?
          </Text>

          <Text style={styles.description}>
            Keskeneräisen testin tuloksia ei tallenneta
          </Text>
          <Spacer height={30} />
          <View style={styles.btnContainer}>
            <Button
              onPress={handleRestartTest}
              text='TESTAA UUDELLEEN'
              color={KUTRI_COLORS.button}
              pressedColor={KUTRI_COLORS.buttonHighlight}
              textStyle={styles.btnText}
              style={styles.btn}
            />
          </View>
        </View>
      </View>
    </>
  )
}

export default TestAgain

const styles = StyleSheet.create({
  inner: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: KUTRI_COLORS.background,
  },
  imageWrapper: {
    marginHorizontal: TOTAL_MARGIN, // add horizontal margin
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 512 / 392,
    resizeMode: 'contain',
  },
  content: {
    marginHorizontal: TOTAL_MARGIN,
    backgroundColor: KUTRI_COLORS.foreground,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  title: { 
    fontSize: 25,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
  },
  btnContainer: {
    alignItems: 'center',
  },
  btn: {
    width: 200,
    height: 60,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
  },
  btnText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },

})
