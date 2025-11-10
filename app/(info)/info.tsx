import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { getAdhdPart, getAdhdType } from '@/lib/adhd-utils'
import { ADHD_DATA } from '@/lib/adhd-data'
import { ADHD_ACCORDION } from '@/lib/adhd-accordion'
import { getReadMoreType } from '@/lib/adhd-read-more'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

import StepProgressbar from '@/components/custom/step-progressbar'
import Spacer from '@/components/ui/Spacer'
import IconButton from '@/components/custom/icon-button'

const InfoPage = () => {

  // Search local params
  const { typeOfResult } = useLocalSearchParams<{ typeOfResult: string }>();
  if (!typeOfResult) return null;

  // Search type from ADHD_DATA
  const selectedType = getAdhdType(ADHD_DATA, typeOfResult)
  const selectedAccordion = getAdhdType(ADHD_ACCORDION, typeOfResult);
  const selectedReadMore = getReadMoreType(typeOfResult);
  if (!selectedType || !selectedAccordion || !selectedAccordion) {
    console.log("Type not found");
    return null;
  }

  // Proceed with displaying data
  const [partIndex, setPartIndex] = useState(0);
  const partCount = Object.keys(selectedType).length;
  const totalCount = partCount + 2;   // + 2 is from Accordion page and Read More Page
  const currentPart = getAdhdPart(selectedType, partIndex);

  // navigation buttons
  const goNext = () => {
    if (partIndex < totalCount - 1) {
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
  const navigationBtns = (
    <>
      <View style={styles.navigationContainer}>
        <Button onPress={goPrevious}>
          <Text>Edellinen</Text>
        </Button>
        <Spacer width={20} />
        <Button onPress={goNext} disabled={partIndex >= totalCount - 1}>
          <Text>Seuraava</Text>
        </Button>
      </View>
    </>
  )

  // Content loading
  let content = null;
  if (partIndex < partCount) {
    // Display normal content
    content = (
      <>
        <Text style={styles.title}>{currentPart?.title}</Text>
        <View>
          {currentPart?.text.map((line, idx) => (
            <Text 
            key={idx} 
            style={[
              styles.text,
              idx === 0 && { fontWeight: 'bold' }
            ]} 
            accessibilityRole="text">
              {line}
            </Text>
          ))}
        </View>
        {navigationBtns}
      </>
    )

  } else if (partIndex == partCount) {
    // Display Accordion content
    const accordionParts = Object.values(selectedAccordion);
    content = (
      <>
        <View>
          <Text style={styles.title}>Tässä muutama vinkki!</Text>
          <Spacer height={20} />
          <Accordion type='multiple' style={styles.accordionContainer}>
            {accordionParts.map((part, idx) => (
              <AccordionItem key={idx} value={idx.toString()} style={styles.accordionItem}>
                <AccordionTrigger>
                  <Text style={styles.accordionTitle}>{part.title}</Text>
                </AccordionTrigger>
                <AccordionContent>
                  {part.text.map((line, idx2) => (
                    <Text key={idx2} style={styles.accordionText} accessibilityRole='text'>
                      {line}
                    </Text>
                  ))}
                </AccordionContent>
              </AccordionItem >
            ))}
            {navigationBtns}
          </Accordion>
        </View>
      </>
    )
  } else {
    // Display Read more content


    content = (
      <>
        <View>
          <Text style={styles.title}>
            {selectedReadMore?.title}
          </Text>
          <View>
            {selectedReadMore?.text.map((line, idx) => (
              <Text style={styles.text} key={idx}>
                {line}
              </Text>
            ))}
          </View>
        </View>
        {navigationBtns}
      </>
    )
  }

  if (content == null) return;

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>

        <ScrollView>
          <View style={styles.scrollMargin}>
            <View style={styles.headerContainer}>
              <View style={styles.progressWrapper}>
                <StepProgressbar
                  maxSteps={totalCount}
                  currentStep={partIndex}
                  buttonStyle={styles.progressbar}
                />
              </View>

              <IconButton
                iconName='close'
                style={styles.iconContainer}
                onPress={router.back}
              />
            </View>

            {content}
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
    marginHorizontal: '3%',
    paddingVertical: 10,
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
    marginHorizontal: '7%'
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 32,
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
  progressbar: {
    // passed to StepProgressbar as `buttonStyle` and controls segment height
    height: 6,
    borderRadius: 6,
  },
  accordionContainer: {
  },
  accordionItem: {
    marginVertical: 10,
  },
  accordionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  accordionText: {
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 7,
  }
})