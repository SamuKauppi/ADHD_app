import { ScrollView, StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { QUESTIONS } from '../lib/questions';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionGroup from '@/components/custom/question-group';
import NavigationButtons from '@/components/custom/navigation-buttons';
import { useSwipe } from '@/components/custom/hooks/swipe';
import HeaderWithProgress from '@/components/custom/header-progressbar';

export default function TestScreen() {
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
                <HeaderWithProgress
                    currentStep={currentIndex}
                    maxSteps={questionKeys.length}
                    onClose={router.back}
                />
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
    },
    scrollMargin: {
        marginHorizontal: '3%'
    },
    content: {
        flex: 1,
        marginHorizontal: '7%',
        justifyContent: 'space-between',
    },
    navigationContainer: {
        marginTop: 20
    }
});
