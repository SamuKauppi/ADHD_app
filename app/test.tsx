import { ScrollView, StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { QUESTIONS } from '../lib/questions';
import { SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '@/components/ui/Spacer';
import StepProgressbar from '@/components/custom/step-progressbar';
import IconButton from '@/components/custom/icon-button';
import QuestionGroup from '@/components/custom/question-group';
import NavigationButtons from '@/components/custom/navigation-buttons';

export default function TestScreen() {
    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentKey = questionKeys[currentIndex];
    const currentQuestion = QUESTIONS[currentKey];
    const router = useRouter();

    const [canGoNext, setCanGoNext] = useState(false);

    useEffect(() => {
        updateCanGoNext(currentKey, currentQuestion.options.length)
    }, [currentKey]);

    const goNext = () => {
        if (currentIndex < questionKeys.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCanGoNext(false);
        } else {
            try {
                AsyncStorage.setItem('testCompleted', 'true');
                router.replace('/result');
            } catch (error) {
                console.warn('Failed to finalize test', error);
            }
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
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
            <SafeAreaView style={styles.container}>
                <View style={styles.headers}>
                    <IconButton
                        iconName='close'
                        style={styles.closeIconContainer}
                        onPress={() => router.back()}
                    />
                </View>

                <View style={styles.content}>
                    <ScrollView>
                        <View style={styles.progressWrapper}>
                            <StepProgressbar
                                maxSteps={questionKeys.length}
                                currentStep={currentIndex}
                                buttonStyle={styles.progressbarBtn}
                            />
                        </View>

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
                        />
                    </ScrollView>

                </View>
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
    headers: {
        marginTop: 10,
        paddingHorizontal: '4%',
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 8
    },
    progressWrapper: {
        flex: 1,
        marginRight: 12,
        minWidth: 0, // lets bar shrink instead of pushing icon out
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    closeIconContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressbarBtn: {
        height: 6,
        borderRadius: 6,
    },
    content: {
        flex: 1,
        marginHorizontal: '10%', // adjustable between 5%–15%
        justifyContent: 'space-between',
    },
    navigationContainer: {
        marginTop: 20
    }
});
