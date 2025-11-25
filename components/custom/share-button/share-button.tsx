import { StyleSheet, TextStyle, ViewStyle, Text, View } from "react-native";
import { useState } from "react"
import { ADHD_TYPE } from "@/lib/adhd-types";
import { ShareHandling } from "./share-handling";

import IconButton from "../navigation/icon-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KUTRI_COLORS } from "@/lib/brand-colors";
import Button from '@/components/custom/generic/button'

type ShareProps = {
    style?: ViewStyle;
    txtStyle?: TextStyle;
}

// Button that opens the sharewindow
const ShareResultButton = ({ style, txtStyle }: ShareProps) => {
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        setLoading(true);

        try {
            const highestKey = await AsyncStorage.getItem('result:highest');
            if (!highestKey) {
                console.log('No highest in memory')
                setLoading(false);
                return;
            }

            const valueStr = await AsyncStorage.getItem(`result:${highestKey}`)
            const value = valueStr ? parseInt(valueStr) : 0;

            const typeName = ADHD_TYPE[highestKey]?.name || highestKey;
            const message = `Olen ${value}% ${typeName}! Lue lisää osoitteessa: https://kutri.net/`
            const url = '../assets/images/close.png'

            await ShareHandling({ message, url });

        } catch (err) {
            console.error('Error sharing result', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            onPress={handleShare}
            style={[styles.container, style]}
            contentStyle={styles.buttonContent}
            textStyle={[styles.shareBtnText, txtStyle]}
            color={KUTRI_COLORS.button}
            pressedColor={KUTRI_COLORS.buttonHighlight}
            leftIcon={<IconButton iconName="shareD" style={styles.iconSize} />}
            text={loading ? 'LATAA...' : 'JAA TULOKSESI!'}
        />
    )
}

export default ShareResultButton;

const styles = StyleSheet.create({
    iconSize: {
        height: 30,
        width: 30
    },
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        width: 200,
        backgroundColor: KUTRI_COLORS.button,
        borderColor: KUTRI_COLORS.cardForeground,
        borderWidth: 2
    },
    buttonContent: {
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    shareBtnText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black'
    },
})