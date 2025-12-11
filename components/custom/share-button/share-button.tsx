import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useState } from "react";
import { ShareHandling } from "./share-handling";
import { KUTRI_COLORS } from "@/lib/brand-colors";

import IconButton from "../navigation/icon-button";
import Button from '@/components/custom/navigation/button';

type ShareProps = {
    style?: ViewStyle;
    txtStyle?: TextStyle;
};

const ShareResultButton = ({ style, txtStyle }: ShareProps) => {
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        setLoading(true);
        await ShareHandling({ url: '../assets/images/close.png' });
        setLoading(false);
    };

    return (
        <Button
            onPress={handleShare}
            style={[styles.container, style]}
            contentStyle={styles.buttonContent}
            textStyle={[styles.shareBtnText, txtStyle]}
            color={KUTRI_COLORS.button}
            pressedColor={KUTRI_COLORS.buttonHighlight}
            leftIcon={<IconButton iconName="share" style={styles.iconSize} />}
            text={loading ? 'LATAA...' : 'JAA TULOKSESI!'}
        />
    );
};

export default ShareResultButton;

const styles = StyleSheet.create({
    iconSize: {
        height: 30,
        width: 30,
    },
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        height: 60,
        width: '100%',
        backgroundColor: KUTRI_COLORS.button,
        borderColor: KUTRI_COLORS.cardForeground,
        borderWidth: 2,
    },
    buttonContent: {
        justifyContent: 'center',
        gap: 10,
    },
    shareBtnText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
    },
});
