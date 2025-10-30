import { StyleSheet, View } from 'react-native'
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

const SCREEN_OPTIONS = {
    title: 'Takasin',
    headerTransparent: true,
};

export default function TestScreen() {

    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentKey = questionKeys[currentIndex];
    const currentQuestion = QUESTIONS[currentKey];
    const router = useRouter()

    const [canGoNext, setCanGoNext] = useState(false);

    useEffect(() => {
        updateCanGoNext(currentKey, currentQuestion.options.length)
    }, [currentKey]);

    const goNext = () => {
        if (currentIndex < questionKeys.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setCanGoNext(false);
        }
        else {
            try {
                AsyncStorage.setItem('testCompleted', 'true');
                // Navigate to result page or perform any final action
                router.push('/result');
            } catch (error) {
                console.warn('Failed to finalize test', error);
            }

        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        else {
            // Optionally handle going back to start page
            router.back()
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
            <Stack.Screen options={SCREEN_OPTIONS} />
            <SafeAreaView style={styles.container}>
                <IconButton
                    source={require('assets/images/close.png')}
                    style={styles.iconContainer}
                    imgStyle={styles.closeIcon}
                    onPress={() => router.back()}
                />
                <StepProgressbar maxSteps={questionKeys.length} currentStep={currentIndex} />

                <QuestionGroup
                    questionData={currentQuestion}
                    questionKey={currentKey}
                    onChange={(currentQuestionStates) => {
                        setCanGoNext(currentQuestionStates.some(Boolean))
                    }}
                />

                <View style={styles.navigationContainer}>
                    <View style={styles.navigation}>
                        <Button onPress={goPrevious}>
                            <Text>{currentIndex === 0 ? "Takaisin" : "Edellinen"}</Text>
                        </Button>
                        <Spacer width={20} />
                        <Button onPress={goNext} disabled={!canGoNext}>
                            <Text>{currentIndex === questionKeys.length - 1 ? "Valmis" : "Seuraava"}</Text>
                        </Button>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '10%',
        paddingBottom: '5%'
    },
    navigationContainer: {
        alignItems: 'center'
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingBottom: 15,
    },
    closeIcon: {
        width: 25,
        height: 25,
    }
});


