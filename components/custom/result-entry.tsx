import { Pressable, useColorScheme, ViewStyle } from 'react-native'
import { Text } from '@/components/ui/text';
import React from 'react'
import { THEME } from '@/lib/theme';

type ResultEntryProps = {
  typeKey: string;
  typeLabel: string;
  score: number;
  maxScore: number;
  style?: any;
  onPress?: (typeKey: string) => void;
};

const ResultEntry = ({ typeKey, typeLabel, score, maxScore, style, onPress }: ResultEntryProps) => {

    const scheme = useColorScheme();
    const theme = THEME[scheme ?? 'light'];

    const percentage = score && maxScore ? (score / maxScore) * 100 : 0;

    return (
        <Pressable style={[style, {borderColor:theme.border}]} onPress={() => onPress?.(typeKey)}>
            <Text>{percentage.toFixed(0)}%</Text>
            <Text>{typeLabel}</Text>
        </Pressable>
    )
}

export default ResultEntry