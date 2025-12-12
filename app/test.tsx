import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { QUESTIONS } from '../lib/questions';
import QuestionGroup from '@/components/custom/question/question-group';
import NavigationButtons from '@/components/custom/navigation/navigation-buttons';
import HeaderWithProgress from '@/components/custom/navigation/header-progressbar';
import HeaderTitle from '@/components/custom/navigation/header-title';
import NavbarStyle from '@/components/custom/hooks/navbar-style';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { SCROLLVIEW_HORIZONTAL_MARGIN, SCROLL_CONTENT_HORIZONTAL_MARGIN, TOTAL_MARGIN } from '@/lib/layout';
import { useSwipe } from '@/components/custom/hooks/swipe';
import { SaveFinalResults } from '@/components/custom/functions/save-results';

export default function TestScreen() {
  const questionKeys = Object.keys(QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentKey = questionKeys[currentIndex];
  const currentQuestion = QUESTIONS[currentKey];
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [canGoNext, setCanGoNext] = useState(false);
  const questionCount = questionKeys.length;

  // Swipe handling
  const panHandlers = useSwipe({
    onSwipeLeft: () => { if (canGoNext) goNext(); },
    onSwipeRight: () => { goPrevious(); },
  });

  // Call can go next
  useEffect(() => {
    updateCanGoNext(currentKey, questionCount);
  }, [currentKey]);

  const goNext = async () => {
    if (currentIndex >= questionKeys.length - 1) {
      // Last question: calculate and save final results
      await SaveFinalResults();
      router.dismissAll();
      router.replace('/result');
      return;
    }
    setCurrentIndex(prev => prev + 1);
  };

  const goPrevious = () => {
    if (currentIndex <= 0) {
      router.back();
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };


  const updateCanGoNext = async (questionKey: string, optionCount: number) => {
    try {
      const states: boolean[] = [];
      for (let i = 0; i < optionCount; i++) {
        const value = await AsyncStorage.getItem(`${questionKey}:${i}`);
        states[i] = value ? JSON.parse(value) : false;
      }
      setCanGoNext(states.some(Boolean));
    } catch (err) {
      console.warn('Failed to load current question state', err);
      setCanGoNext(false);
    }
  };

  return (
    <>
      <Stack.Screen />
      <HeaderTitle
        containerStyle={{ paddingTop: insets.top }}
        title='Takaisin'
        showLeftBtn={true} />
      <NavbarStyle buttonStyle='dark' />

      <SafeAreaView style={styles.container} {...panHandlers}>
        <View style={styles.headerMargin}>
          <HeaderWithProgress
            currentStep={currentIndex}
            maxSteps={questionCount}
            onClose={router.back}
            style={styles.headerExtra}
          />
        </View>

        <ScrollView style={styles.scrollMargin}>
          <View style={styles.content}>
            <QuestionGroup
              questionData={currentQuestion}
              questionKey={currentKey}
              onChange={(currentQuestionStates) => setCanGoNext(currentQuestionStates.some(Boolean))}
            />

            <NavigationButtons
              onNext={goNext}
              onPrevious={goPrevious}
              containerStyle={styles.navigationContainer}
              disableNext={!canGoNext}
              nextText={currentIndex >= questionCount - 1 ? 'Tuloksiin' : 'Seuraava'}
              prevText={currentIndex <= 0 ? 'Takaisin' : 'Edellinen'}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: KUTRI_COLORS.background,
  },
  headerMargin: {
    paddingTop: '1%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: KUTRI_COLORS.foreground,
    marginHorizontal: TOTAL_MARGIN,
  },
  headerExtra: {
    marginLeft: '7%',
    marginRight: '1%',
  },
  scrollMargin: {
    marginTop: -1,
    marginHorizontal: SCROLLVIEW_HORIZONTAL_MARGIN,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    backgroundColor: KUTRI_COLORS.foreground,
    marginHorizontal: SCROLL_CONTENT_HORIZONTAL_MARGIN,
    paddingHorizontal: '2%',
    paddingBottom: 20,
  },
  navigationContainer: {
    marginTop: 20,
  },
});

