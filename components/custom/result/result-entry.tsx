import { Image, Pressable, StyleSheet, View, ViewStyle, Text } from 'react-native'
import { useState } from 'react'
import { KUTRI_COLORS } from '@/lib/brand-colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import IconButton from '../navigation/icon-button';

type ResultEntryProps = {
    typeKey: string;
    typeLabel: string;
    score: number;
    maxScore: number;
    imgSource: any;
    style?: any;
    lablelStyle?: any;
    numberStyle?: any;
    onPress?: (typeKey: string) => void;
};

// One entry in ResultGroup
const ResultEntry = ({
    typeKey,
    typeLabel,
    score,
    maxScore,
    imgSource,
    style,
    lablelStyle,
    numberStyle,
    onPress }: ResultEntryProps) => {

    const [pressed, setPressed] = useState(false as boolean)
    const percentage = score && maxScore ? (score / maxScore) * 100 : 0;

    const backgroundColor = pressed ? KUTRI_COLORS.background : KUTRI_COLORS.foreground;
    const borderColor = KUTRI_COLORS.cardForeground;

    return (
        <Pressable
            onPress={() => onPress?.(typeKey)}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={[style, { borderColor, backgroundColor }]}
        >
            <Image
                source={imgSource}
                resizeMode='cover'
                style={styles.resultImage} />
            <View style={styles.textContainer}>
                <AnimatedCircularProgress
                    size={82}
                    width={15}
                    fill={percentage}
                    tintColor={KUTRI_COLORS.logo}
                    backgroundColor={KUTRI_COLORS.buttonHighlight}
                    rotation={0}
                >
                    {() => (
                        <Text style={numberStyle}>
                            {percentage.toFixed(0)} %
                        </Text>
                    )}
                </AnimatedCircularProgress>
                <Text
                    style={lablelStyle}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >{typeLabel}</Text>
            </View>
            <IconButton
                iconName='chevronD'
                style={styles.nextIconContainer}
                onPress={() => onPress?.(typeKey)}
            />
        </Pressable>
    )
}

export default ResultEntry

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: '2%',
        gap: '10%'
    },
    resultImage: {
        width: '25%',
        aspectRatio: 1,
        borderRadius: 5,
        overflow: 'hidden',
    },
    nextIconContainer: {
        height: 28,
        width: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
