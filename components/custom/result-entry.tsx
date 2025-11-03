import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text';
import React from 'react'

type ResultEntryProps = {
    typeOfResult: string;
    score?: number;
    maxScore?: number;
}

const ResultEntry = ({ typeOfResult, score, maxScore }: ResultEntryProps) => {

    const percentage =
    score != null && maxScore != null && maxScore !== 0
      ? (score / maxScore) * 100
      : 0;

    return (
        <View style={styles.container}>
            <Text>{typeOfResult}</Text>
            <Text>{percentage.toFixed(0)}%</Text>
        </View>
    )
}

export default ResultEntry

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderWidth: 3,
        marginVertical: 5,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})