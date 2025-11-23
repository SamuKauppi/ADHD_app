import { Pressable, StyleSheet, TextStyle, ViewStyle, Text, View } from "react-native";
import { useState } from "react"
import { ADHD_TYPE } from "@/lib/adhd-types";
import { ShareHandling } from "./share-handling";

import IconButton from "../navigation/icon-button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KUTRI_COLORS } from "@/lib/brand-colors";

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
        <Pressable onPress={handleShare} style={[styles.container, style]}>
            <View>
                <IconButton
                iconName="shareD"
                style={styles.iconSize} />
            </View>

            <Text style={[styles.shareBtnText, txtStyle]}>
                {loading ? 'Lataa...' : 'JAA TULOKSESI!'}
            </Text>

        </Pressable>
    )
}

export default ShareResultButton;

const styles = StyleSheet.create({
    iconSize: {
        height: 30,
        width: 30
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        padding: 10,
        height: 55,
        width: 200,
        backgroundColor: KUTRI_COLORS.button,
        borderColor: KUTRI_COLORS.buttonHighlight,
        borderWidth: 3
    },
    shareBtnText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
})