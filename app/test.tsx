import { StyleSheet, View } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { QUESTIONS } from '../lib/questions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '@/components/ui/Spacer';
import QuestionCheckbox from '@/components/custom/question-checkbox';
import StepProgressbar from '@/components/custom/step-progressbar';

const SCREEN_OPTIONS = {
    title: 'Takasin',
    headerTransparent: true,
};

export default function TestScreen() {

    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentKey = questionKeys[currentIndex];
    const currentQuestion = QUESTIONS[currentKey];
    const router = useRouter();

    const goNext = () => {
        if (currentIndex < questionKeys.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        else {
            try {
                AsyncStorage.setItem('testCompleted', 'true');
            } catch (error) {
                console.warn('Failed to finalize test', error);
            }
            // Navigate to result page or perform any final action
            router.push('/result');
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        else {
            // Optionally handle going back to start page
            router.back();
        }
    };

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{currentQuestion.question}</Text>
                    <Spacer height={20} />
                    {currentQuestion.options.map((option, index) => {
                        const storageKey = `${currentKey}:${index}`
                        return (
                            <QuestionCheckbox
                                key={index}
                                question={option}
                                storageKey={storageKey}
                                textStyle={styles.question}
                            />
                        )
                    })}
                </View>

                <View style={styles.navigationContainer}>
                    <View style={styles.navigation}>
                        <Button onPress={goPrevious}>
                            <Text>{currentIndex === 0 ? "Takaisin" : "Edellinen"}</Text>
                        </Button>
                        <Spacer width={20} />
                        <Button onPress={goNext}>
                            <Text>{currentIndex === questionKeys.length - 1 ? "Valmis" : "Seuraava"}</Text>
                        </Button>
                    </View>

                    <Spacer height={10} />

                    <StepProgressbar maxSteps={questionKeys.length} currentStep={currentIndex} />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '20%', // optional top padding
    },
    container: {
        flex: 1,
        justifyContent: 'space-between', // Push content to top and bottom
        paddingHorizontal: 20,
        paddingBottom: '15%', // safe padding for bottom buttons
    },
    content: {
        flex: 1,
        justifyContent: 'center', // questions at the top
    },
    navigationContainer: {
        alignItems: 'center',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    question: {
        fontSize: 15,
    }
});
