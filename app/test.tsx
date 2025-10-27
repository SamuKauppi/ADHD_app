import { StyleSheet, View } from 'react-native'
import { Stack } from 'expo-router';
import { Text } from '@/components/ui/text';
import { useState } from 'react';

import { QUESTIONS } from '../lib/questions';
import Spacer from '@/components/ui/Spacer';


const SCREEN_OPTIONS = {
    title: 'Takasin',
    headerTransparent: true,
};

export default function TestScreen() {

    const questionKeys = Object.keys(QUESTIONS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = QUESTIONS[questionKeys[currentIndex]];

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View style={styles.container}>
                <Text style={styles.title}>This is the test page</Text>

                <Spacer height={50} />
                <Text>{currentQuestion.question}</Text>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
