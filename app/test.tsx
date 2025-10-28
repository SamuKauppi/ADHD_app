import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { QUESTIONS } from '../lib/questions';

import Spacer from '@/components/ui/Spacer';
import QuestionCheckbox from '@/components/ui/questionCheckbox';

const SCREEN_OPTIONS = {
    title: 'Takasin',
    headerTransparent: true,
};

export default function TestScreen() {

    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentKey = questionKeys[currentIndex];
    const currentQuestion = QUESTIONS[currentKey];

    const goNext = () => {
        if (currentIndex < questionKeys.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View style={styles.container}>
                <Text style={styles.title}>{currentQuestion.question}</Text>
                <Spacer height={20} />
                {currentQuestion.options.map((option, index) => {
                    const storageKey = `q:${currentKey}:opt:${index}`
                    return (
                        <QuestionCheckbox
                            key={index}
                            question={option}
                            storageKey={storageKey}
                        />
                    )
                })}
                <Spacer height={30} />
                <View style={styles.navigation}>
                    <Button onPress={goPrevious} disabled={currentIndex === 0}>
                        <Text>Edellinen</Text>
                    </Button>
                    <Spacer width={20} />
                    <Button onPress={goNext} disabled={currentIndex === questionKeys.length - 1}>
                        <Text>Seuraava</Text>
                    </Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
});
