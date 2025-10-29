import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text';
import React from 'react'

type ResultEntryProps = {
    typeOfResult: string;
    score?: number;
}

const ResultEntry = ({ typeOfResult, score }: ResultEntryProps) => {
    return (
        <View style={styles.container}>
            <Text>{typeOfResult}</Text>
            <Text>{score}%</Text>
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