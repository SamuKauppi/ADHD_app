import { ScrollView, StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { QUESTIONS } from '../lib/questions';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSwipe } from '@/components/custom/hooks/swipe';

import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionGroup from '@/components/custom/question/question-group';
import NavigationButtons from '@/components/custom/navigation/navigation-buttons';
import HeaderWithProgress from '@/components/custom/navigation/header-progressbar';
import { KUTRI_COLORS } from '@/lib/brand-colors';

// Test page
export default function TestScreen() {
    // Load questions from questions.ts
    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentKey = questionKeys[currentIndex];
    const currentQuestion = QUESTIONS[currentKey];
    const router = useRouter();

    const [canGoNext, setCanGoNext] = useState(false);
    const panHandlers = useSwipe({
        onSwipeLeft: () => { if (canGoNext) goNext(); },
        onSwipeRight: () => { goPrevious(); },
    });

    useEffect(() => {
        updateCanGoNext(currentKey, currentQuestion.options.length)
    }, [currentKey]);

    const goNext = () => {
        setCurrentIndex(prev => {
            const next = prev + 1;

            // We are at the LAST question now
            if (prev >= questionKeys.length - 1) {
                AsyncStorage.setItem('testCompleted', 'true')
                router.replace('/result');
                return prev; // stay on last index
            }

            return next;
        });
    };


    const goPrevious = () => {
        setCurrentIndex(prev => {
            const next = prev - 1;
            if (prev <= 0)
                return prev;
            return next;
        });

        if (currentIndex <= 0) {
            router.back();
        }
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
            <SafeAreaView style={styles.container}  {...panHandlers}>
                <View style={styles.headerMargin}>
                    <HeaderWithProgress
                        currentStep={currentIndex}
                        maxSteps={questionKeys.length}
                        onClose={router.back}
                        style={styles.headerExtra}
                    />
                </View>

                <ScrollView style={styles.scrollMargin}>

                    <View style={styles.content}>

                        <QuestionGroup
                            questionData={currentQuestion}
                            questionKey={currentKey}
                            onChange={(currentQuestionStates) => {
                                setCanGoNext(currentQuestionStates.some(Boolean))
                            }}
                        />

                        <NavigationButtons
                            onNext={goNext}
                            onPrevious={goPrevious}
                            containerStyle={styles.navigationContainer}
                            disableNext={!canGoNext}
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
        backgroundColor: KUTRI_COLORS.background
    },
    headerMargin: {
        marginHorizontal: '3%',
        paddingTop: '1%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: KUTRI_COLORS.foreground
    },
    headerExtra: {
        marginLeft: '7%',
        marginRight: '1%'
    },
    scrollMargin: {
        marginHorizontal: '3%'
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',

        paddingHorizontal: '7%',
        paddingBottom: '7%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: KUTRI_COLORS.foreground
    },
    navigationContainer: {
        marginTop: 20
    }
});
