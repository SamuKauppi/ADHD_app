import { useRef, useState, useEffect } from 'react'

// Router (expo-router) — navigation, route params and screen wrapper
import { router, Stack, useLocalSearchParams } from 'expo-router'

// React Native primitives used in this file
import { ScrollView, StyleSheet, View, Text } from 'react-native'

// Safe area wrapper
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

// Data + utils for selecting content
import { getAdhdPart, getAdhdType } from '@/lib/adhd-utils'
import { ADHD_DATA } from '@/lib/adhd-data'
import { ADHD_ACCORDION } from '@/lib/adhd-accordion'
import { getReadMoreType } from '@/lib/adhd-read-more'
import { useSwipe } from '@/components/custom/hooks/swipe'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import { APP_HORIZONTAL_MARGIN, APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout'
import { renderWithBold } from '@/components/custom/functions/render-with-bold'

// Local, reusable components (header, accordion group, read-more)
import HeaderWithProgress from '@/components/custom/navigation/header-progressbar'
import AccordionGroup from '@/components/custom/info-page/accordion-group'
import ReadMoreContent from '@/components/custom/info-page/read-more-content'
import NavigationButtons from '@/components/custom/navigation/navigation-buttons'
import HeaderTitle from '@/components/custom/navigation/header-title'

import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import NavbarStyle from '@/components/custom/hooks/navbar-style'

// Displays info based on localSearchParams
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
  const panHandlers = useSwipe({
    onSwipeLeft: () => { goNext(); },
    onSwipeRight: () => { goPrevious(); }
  });
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView | null>(null)
  useEffect(() => {
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false })
  }, [partIndex])


  // navigation handlers
  const goNext = () => {
    setPartIndex(prev => {
      const next = prev + 1;
      if (prev >= totalCount - 1) {
        return prev;
      }
      return next;
    });

    if (partIndex >= totalCount - 1) {
      router.push({
        pathname: '/result',
        params: { typeOfResult }
      });
    }
  };

  const goPrevious = () => {
    setPartIndex(prev => {
      const next = prev - 1;
      if (prev <= 0) {
        return prev;
      }
      return next;
    });

    if (partIndex <= 0) {
      router.back();
    }
  };


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
            style={[styles.text,
            idx === 0 && { fontWeight: 'bold' }]}
            accessibilityRole="text" >
            {renderWithBold(line, currentPart.bold)}
          </Text>))}

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
            link: selectedReadMore?.link
          }}
        />
        <NavigationButtons
          containerStyle={styles.navigationContainer}
          nextText='Tuloksiin'
          onNext={goNext}
          onPrevious={goPrevious} />
      </>
    )
  }

  if (content == null) return null

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, [])

  return (
    <>
      <Stack.Screen />
      <NavbarStyle buttonStyle='dark'/>
      <HeaderTitle/>
      <SafeAreaView style={styles.container} {...panHandlers}>
        <View style={{ paddingHorizontal: APP_HORIZONTAL_MARGIN, flex: 1 }}>
          <View style={styles.headerMargin}>
            <HeaderWithProgress
              currentStep={partIndex}
              maxSteps={totalCount}
              onClose={router.back}
              style={styles.headerExtra} />
          </View>

          {/*-1 margin fixes one pixel gap bug (I don't know why it's there)*/}
          <ScrollView style={{ marginTop: -1, marginBottom: 10 }} ref={scrollRef}>
            <View style={styles.content}>
              {content}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  )
}

export default InfoPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KUTRI_COLORS.background,
    justifyContent: 'flex-start',
  },
  headerMargin: {
    marginHorizontal: APP_HORIZONTAL_SCROLL_PADDING,
    paddingTop: '2%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: KUTRI_COLORS.foreground,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  // Margins for header children (step-progressbar and close icon)
  headerExtra: {
    marginLeft: '5%',
    marginRight: '1%'
  },
  content: {
    marginHorizontal: APP_HORIZONTAL_SCROLL_PADDING,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: KUTRI_COLORS.foreground,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    flex: 1,
    justifyContent: 'space-between',
    padding: 10
  },
  title: {
    marginTop: 10,
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 32
  },
  text: {
    marginBottom: 16,
    fontSize: 18,
    lineHeight: 26
  },
  navigationContainer: {
    marginTop: 30
  }
})
