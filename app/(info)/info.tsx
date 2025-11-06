import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { getAdhdPart, getAdhdType } from '@/lib/adhd-utils'
import { ADHD_DATA } from '@/lib/adhd-data'
import { useState } from 'react'
import StepProgressbar from '@/components/custom/step-progressbar'
import { Button } from '@/components/ui/button'
import Spacer from '@/components/ui/Spacer'
import IconButton from '@/components/custom/icon-button'

const InfoPage = () => {

  // Search local params
  const { typeOfResult } = useLocalSearchParams<{ typeOfResult: string }>();
  if (!typeOfResult) return null;

  // Search type from ADHD_DATA
  const selectedType = getAdhdType(ADHD_DATA, typeOfResult)
  if (!selectedType) return null;

  // Proceed with diplaying data
  const [partIndex, setPartIndex] = useState(0);
  const partCount = Object.keys(selectedType).length
  const currentPart = getAdhdPart(selectedType, partIndex);

  const goNext = () => {
    if (partIndex < partCount - 1) {
      setPartIndex(partIndex + 1)
    } else {
      router.push({
        pathname: '/read-more',
        params: {
          typeOfResult: typeOfResult
        }
      })
    }

  }

  const goPrevious = () => {
    if (partIndex > 0) {
      setPartIndex(partIndex - 1)
    } else {
      router.back();
    }
  }

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>

        <ScrollView>
          <View style={styles.scrollMargin}>
            <View style={styles.headerContainer}>
              <View style={styles.progressWrapper}>
                <StepProgressbar
                  maxSteps={partCount}
                  currentStep={partIndex}
                  buttonStyle={styles.progressbar}
                />
              </View>

              <IconButton
                iconName='close'
                style={styles.iconContainer}
                imgStyle={styles.closeIcon}
                onPress={router.back}
              />
            </View>

            <Text style={styles.title}>{currentPart?.title}</Text>

            <View>
              {currentPart?.text.map((line, idx) => (
                <Text key={idx} style={styles.text} accessibilityRole="text">
                  {line}
                </Text>
              ))}
            </View>

            <View style={styles.navigationContainer}>
              <Button onPress={goPrevious}>
                <Text>Edellinen</Text>
              </Button>
              <Spacer width={20} />
              <Button onPress={goNext}>
                <Text>Seuraava</Text>
              </Button>

            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default InfoPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: '10%'
  },
  progressWrapper: {
    flex: 1,
    marginRight: 12,
    // IMPORTANT: minWidth: 0 lets the child shrink on iOS/Android
    minWidth: 0,
    alignSelf: 'flex-end',
  },
  scrollMargin: {
    marginHorizontal: '12%'
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
  },
  text: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 26,
  },
  navigationContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // larger touch target and icon size
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    // slightly larger close icon
    width: 28,
    height: 28,
  },
  progressbar: {
    // passed to StepProgressbar as `buttonStyle` and controls segment height
    height: 6,
    borderRadius: 6,
  }
})