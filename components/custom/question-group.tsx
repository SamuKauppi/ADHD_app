import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionCheckbox from './question-checkbox';

type Question = {
    question: string;
    options: string[];
};

type QuestionItemProps = {
    questionData: Question;
    questionKey: string;
    onChange?: (checkedStates: boolean[]) => void;
};

export default function QuestionItem({ questionData, questionKey, onChange }: QuestionItemProps) {
    const [checkedStates, setCheckedStates] = useState<boolean[]>(
        Array(questionData.options.length).fill(false)
    );

    const lastIndex = questionData.options.length - 1; // index of "none of the above"

    // Load values
    useEffect(() => {
        let mounted = true;

        (async () => {
            const states: boolean[] = [];
            for (let i = 0; i < questionData.options.length; i++) {
                const key = `${questionKey}:${i}`;
                try {
                    const raw = await AsyncStorage.getItem(key);
                    states[i] = raw ? JSON.parse(raw) : false;
                } catch (err) {
                    console.warn('Failed to load checkbox', key, err);
                    states[i] = false;
                }
            }
            if (mounted) setCheckedStates(states);
        })();

        return () => { mounted = false };
    }, [questionData.options.length, questionKey]);

    const handleChange = async (index: number, value: boolean) => {
        let updatedStates = [...checkedStates];

        if (index === lastIndex && value) {
            // Selecting "None of the above" → deselect all others
            updatedStates = updatedStates.map((_, i) => i === lastIndex);
        } else if (index !== lastIndex && value) {
            // Selecting any other option → deselect "None of the above"
            updatedStates[index] = true;
            updatedStates[lastIndex] = false;
        } else {
            // Deselecting the current option
            updatedStates[index] = false;
        }

        // Save all updated states
        try {
            for (let i = 0; i < updatedStates.length; i++) {
                const key = `${questionKey}:${i}`;
                await AsyncStorage.setItem(key, JSON.stringify(updatedStates[i]));
            }
            setCheckedStates(updatedStates);

            if (onChange) onChange(updatedStates)

        } catch (err) {
            console.warn('Failed to save checkbox states', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{questionData.question}</Text>
            {questionData.options.map((option, index) => (
                <QuestionCheckbox
                    key={index}
                    question={option}
                    checked={checkedStates[index] ?? false}
                    onChange={(val) => handleChange(index, val)}
                    textStyle={styles.optionText}
                />
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20
    },
    optionText: {
        fontSize: 16,
    },
});
