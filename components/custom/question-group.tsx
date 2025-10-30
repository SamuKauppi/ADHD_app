import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage'
import QuestionCheckbox from './question-checkbox';


type QuestionGroupProps = {
    questionId: string;
    currentKey: number;
    style?: object;
}

type SelectionState = Record<string, boolean>

const QuestionGroup = ({ questionId, currentKey, style }: QuestionGroupProps) => {

    const [selected, setSelected] = useState<SelectionState>({})

    // Load saved selections from AsyncStorage
    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem(`${questionId}`);
                if (raw) {
                    setSelected(JSON.parse(raw));
                }
            } catch (error) {
                console.warn('Failed to load question group state', questionId, error);
            }

        }
        load();
    }, [questionId]);

    useEffect(() => {
        const save = async () => {
            try {
                await AsyncStorage.setItem(`${questionId}`, JSON.stringify(selected));

            } catch (error) {
                console.warn('Failed to save question group state', questionId, error);
            }
        }
        save()
    })


    return (
        <View style={style}>

        </View>
    )
}

export default QuestionGroup

const styles = StyleSheet.create({})