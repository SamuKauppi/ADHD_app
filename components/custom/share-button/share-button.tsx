import { useState } from "react"
import { ADHD_TYPE } from "@/lib/adhd-types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShareHandling } from "./share-handling";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Pressable, StyleSheet, TextStyle, ViewStyle } from "react-native";
import IconButton from "../navigation/icon-button";

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
            <IconButton
                iconName="share"
                oppositeColor={true}
                style={styles.iconSize} />
            <Text style={txtStyle}>
                {loading ? 'Lataa...' : 'Jaa Tuloksesi!'}
            </Text>

        </Pressable>
    )
}

export default ShareResultButton;

const styles = StyleSheet.create({
    iconSize: {
        height: 20,
        width: 20
    },
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10
    }
})