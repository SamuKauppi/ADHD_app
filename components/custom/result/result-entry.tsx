import { Image, Pressable, StyleSheet, useColorScheme, View, ViewStyle } from 'react-native'
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
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

    const scheme = useColorScheme();
    const theme = THEME[scheme ?? 'light'];

    const percentage = score && maxScore ? (score / maxScore) * 100 : 0;

    return (
        <Pressable style={[style, { borderColor: theme.border, backgroundColor: theme.card }]} onPress={() => onPress?.(typeKey)}>
            <Image
                source={imgSource}
                resizeMode='cover'
                style={styles.resultImage} />
            <View style={styles.textContainer}>
                <AnimatedCircularProgress
                    size={82}
                    width={15}
                    fill={percentage}
                    tintColor="#00a2e8"
                    backgroundColor="#cffaff"
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
                iconName='chevron'
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
