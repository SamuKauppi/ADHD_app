import { useRef, useState, useEffect } from 'react'

// Router
import { router, Stack, useLocalSearchParams } from 'expo-router'

// React Native
import { ScrollView, StyleSheet, View, Text, Platform } from 'react-native'

// Safe area
import { SafeAreaView } from 'react-native-safe-area-context'

// Data + utils
import { getAdhdPart, getAdhdType } from '@/lib/adhd-utils'
import { ADHD_DATA } from '@/lib/adhd-data'
import { ADHD_ACCORDION } from '@/lib/adhd-accordion'
import { getReadMoreType } from '@/lib/adhd-read-more'
import { useSwipe } from '@/components/custom/hooks/swipe'

// Constants / helpers
import { KUTRI_COLORS } from '@/lib/brand-colors'
import { SCROLLVIEW_HORIZONTAL_MARGIN , SCROLL_CONTENT_HORIZONTAL_MARGIN  } from '@/lib/layout'
import { renderWithBold } from '@/components/custom/functions/render-with-bold'

// Components
import HeaderWithProgress from '@/components/custom/navigation/header-progressbar'
import AccordionGroup from '@/components/custom/info-page/accordion-group'
import ReadMoreContent from '@/components/custom/info-page/read-more-content'
import NavigationButtons from '@/components/custom/navigation/navigation-buttons'
import HeaderTitle from '@/components/custom/navigation/header-title'

import * as NavigationBar from 'expo-navigation-bar'
import NavbarStyle from '@/components/custom/hooks/navbar-style'
import Spacer from '@/components/ui/Spacer'

const InfoPage = () => {
  // Check for given param for info type
  const { typeOfResult } = useLocalSearchParams<{ typeOfResult: string }>()
  if (!typeOfResult) return null

  // Load content based on type
  const selectedType = getAdhdType(ADHD_DATA, typeOfResult)
  const selectedAccordion = getAdhdType(ADHD_ACCORDION, typeOfResult)
  const selectedReadMore = getReadMoreType(typeOfResult)
  if (!selectedType || !selectedAccordion || !selectedReadMore) return null

  // Variables
  const [partIndex, setPartIndex] = useState(0)
  const scrollRef = useRef<ScrollView | null>(null)

  const partCount = Object.keys(selectedType).length
  const totalCount = partCount + 2

  const isFirst = partIndex == 0;
  const isLast = partIndex >= totalCount - 1;

  // navigation handlers
  const goNext = () => {
    setPartIndex(prev => {
      const next = prev + 1
      if (prev >= totalCount - 1) {
        return prev
      }
      return next
    })

    if (partIndex >= totalCount - 1) {
      router.push({
        pathname: '/result',
        params: { typeOfResult }
      })
    }
  }

  const goPrevious = () => {
    setPartIndex(prev => {
      const next = prev - 1
      if (prev <= 0) {
        return prev
      }
      return next
    })

    if (partIndex <= 0) {
      router.back()
    }
  }

  const panHandlers = useSwipe({
    onSwipeLeft: goNext,
    onSwipeRight: goPrevious
  })

  useEffect(() => {
    if (Platform.OS === 'android') NavigationBar.setButtonStyleAsync('dark')
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [partIndex])

  // ----- CONTENT SELECTION -----
  let content = null

  if (partIndex < partCount) {
    // Load main content
    const currentPart = getAdhdPart(selectedType, partIndex)

    content = (
      <>
        <Text style={styles.title}>{currentPart?.title}</Text>

        {currentPart?.text.map((line, idx) => (
          <Text
            key={idx}
            style={[styles.text, idx === 0 && { fontWeight: 'bold' }]}
          >
            {renderWithBold(line, currentPart.bold)}
          </Text>
        ))}
      </>
    )
  } else if (partIndex == partCount) {
    // Second to last is always accordion content
    content = (
      <>
        <Text style={styles.title}>Tässä muutama vinkki!</Text>
        <AccordionGroup accordionParts={Object.values(selectedAccordion)} />
        <Spacer height={20} />
      </>
    )
  } else {
    // Last content is always read more content
    content = (
      <ReadMoreContent
        data={{
          title: selectedReadMore?.title ?? '',
          text: selectedReadMore?.text ?? [],
          link: selectedReadMore?.link
        }}
      />
    )
  }

  // Texts for the navigation buttons (undefined = default navigation button text)
  const prevText = isFirst ? 'Takaisin' : undefined
  const nextText = isLast ? 'Tuloksiin' : undefined

  return (
    <>
      <Stack.Screen />
      <NavbarStyle buttonStyle="dark" />
      <HeaderTitle
        title='Takaisin'
        showLeftBtn={true}
        onPressLeft={() => router.back()} />

      <SafeAreaView style={styles.container} {...panHandlers}>
        <View style={{ paddingHorizontal: SCROLLVIEW_HORIZONTAL_MARGIN , flex: 1 }}>
          <View style={styles.headerMargin}>
            <HeaderWithProgress
              currentStep={partIndex}
              maxSteps={totalCount}
              onClose={router.back}
              style={styles.headerExtra}
            />
          </View>

          <ScrollView
            style={{ marginTop: -1, marginBottom: 10 }}
            ref={scrollRef}
          >
            <View style={styles.content}>
              {content}

              <NavigationButtons
                onNext={goNext}
                onPrevious={goPrevious}
                prevText={prevText}
                nextText={nextText}
              />
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
    backgroundColor: KUTRI_COLORS.background
  },
  headerMargin: {
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN ,
    paddingTop: '2%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: KUTRI_COLORS.foreground,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  headerExtra: {
    marginLeft: '5%',
    marginRight: '1%'
  },
  content: {
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN ,
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
  }
})
