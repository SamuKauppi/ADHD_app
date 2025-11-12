// InfoPage.tsx
import React, { useState } from 'react' // react + hooks

// Router (expo-router) — navigation, route params and screen wrapper
import { router, Stack, useLocalSearchParams } from 'expo-router'

// React Native primitives used in this file
import { ScrollView, StyleSheet, View } from 'react-native'

// Safe area wrapper
import { SafeAreaView } from 'react-native-safe-area-context'

// App UI primitives
import { Text } from '@/components/ui/text'

// Data + utils for selecting content
import { getAdhdPart, getAdhdType } from '@/lib/adhd-utils'
import { ADHD_DATA } from '@/lib/adhd-data'
import { ADHD_ACCORDION } from '@/lib/adhd-accordion'
import { getReadMoreType } from '@/lib/adhd-read-more'

// Local, reusable components (header, accordion group, read-more)
import HeaderWithProgress from '@/components/custom/header-progressbar'
import AccordionGroup from '@/components/custom/info-page/accordion-group'
import ReadMoreContent from '@/components/custom/info-page/read-more-content'
import NavigationButtons from '@/components/custom/navigation-buttons'

const InfoPage = () => {
  // Search local params
  const { typeOfResult } = useLocalSearchParams<{ typeOfResult: string }>()
  if (!typeOfResult) return null

  // Search type from ADHD_DATA
  const selectedType = getAdhdType(ADHD_DATA, typeOfResult)
  const selectedAccordion = getAdhdType(ADHD_ACCORDION, typeOfResult)
  const selectedReadMore = getReadMoreType(typeOfResult)
  if (!selectedType || !selectedAccordion) {
    console.log('Type not found')
    return null
  }

  // Proceed with displaying data
  const [partIndex, setPartIndex] = useState(0)
  const partCount = Object.keys(selectedType).length
  const totalCount = partCount + 2 // +2 is from Accordion page and Read More Page
  const currentPart = getAdhdPart(selectedType, partIndex)

  // navigation handlers
  const goNext = () => {
    if (partIndex < totalCount - 1) {
      setPartIndex(partIndex + 1)
    } else {
      router.push({
        pathname: '/read-more',
        params: { typeOfResult: typeOfResult }
      })
    }
  }
  const goPrevious = () => {
    if (partIndex > 0) {
      setPartIndex(partIndex - 1)
    } else {
      router.back()
    }
  }

  // Content loading
  let content = null

  if (partIndex < partCount) {
    // Display normal content
    content = (
      <>
        <Text style={styles.title}>{currentPart?.title}</Text>

        {currentPart?.text.map((line: string, idx: number) => (
          <Text
            key={idx}
            style={[styles.text, idx === 0 && { fontWeight: 'bold' }]}
            accessibilityRole="text"
          >
            {line}
          </Text>
        ))}
        <NavigationButtons
          onNext={goNext}
          onPrevious={goPrevious}
          containerStyle={styles.navigationContainer}
        />

      </>
    )
  } else if (partIndex === partCount) {
    // Display Accordion content
    content = (
      <>
        <Text style={styles.title}>Tässä muutama vinkki!</Text>
        <AccordionGroup
          accordionParts={Object.values(selectedAccordion)}
        />
        <NavigationButtons
          containerStyle={styles.navigationContainer}
          onNext={goNext}
          onPrevious={goPrevious} />
      </>
    )
  } else {
    // Display Read more content
    content = (
      <>
        <ReadMoreContent
          data={{
            title: selectedReadMore?.title ?? '',
            text: selectedReadMore?.text ?? [],
            link: selectedReadMore?.link // optional — ReadMoreContent handles undefined safely
          }}
        />
        <NavigationButtons
          containerStyle={styles.navigationContainer}
          onNext={goNext}
          onPrevious={goPrevious}
          disableNext={true} />
      </>
    )
  }

  if (content == null) return null

  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.scrollMargin}>
            <HeaderWithProgress currentStep={partIndex} maxSteps={totalCount} onClose={router.back} />
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
    paddingVertical: 10
  },
  scrollMargin: {
    marginHorizontal: '7%'
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 28,
    lineHeight: 32
  },
  text: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 26
  },
  navigationContainer: {
    marginTop: 30
  }
})
