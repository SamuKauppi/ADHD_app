import { StyleSheet, View, Image } from 'react-native'
import { Stack, useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { QUESTIONS } from '../lib/questions';
import { SafeAreaView } from 'react-native-safe-area-context';


import AsyncStorage from '@react-native-async-storage/async-storage';
import Spacer from '@/components/ui/Spacer';
import QuestionCheckbox from '@/components/custom/question-checkbox';
import StepProgressbar from '@/components/custom/step-progressbar';
import IconButton from '@/components/custom/icon-button';

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
            <SafeAreaView style={styles.container}>
                <IconButton
                    source={require('assets/images/close.png')}
                    style={styles.iconContainer}
                    imgStyle={styles.closeIcon}
                    onPress={() => router.back()}
                />
                <StepProgressbar maxSteps={questionKeys.length} currentStep={currentIndex} />

                <View style={styles.content}>
                    <Text style={styles.title}>{currentQuestion.question}</Text>

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
    content: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    question: {
        fontSize: 16
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
        paddingBottom: 20
    },
    closeIcon: {
        width: 50,
        height: 50,
    }
});


