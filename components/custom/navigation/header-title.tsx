import { KUTRI_COLORS } from '@/lib/brand-colors';
import { TOTAL_MARGIN } from '@/lib/layout';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import IconButton from './icon-button';
import { router } from 'expo-router';

type HeaderTitleProps = {
    title?: string;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    showLeftBtn?: boolean;
    showRightBtn?: boolean;
    onPressLeft?: () => void;
    onPressRight?: () => void;
}

const HeaderTitle = ({
    title,
    containerStyle,
    titleStyle,
    showLeftBtn = false,
    showRightBtn = false,
    onPressLeft,
    onPressRight,
}: HeaderTitleProps) => {
    const insets = useSafeAreaInsets();

    const fontColor = KUTRI_COLORS.textLight;
    const backgroundColor = KUTRI_COLORS.cardForeground;

    return (
        <View
            style={[
                styles.container,
                containerStyle,
                {
                    backgroundColor,
                    paddingTop: insets.top,
                },
            ]}
        >
            <View style={styles.content}>
                {showLeftBtn && (
                    <IconButton
                        iconName='chevron'
                        direction='left'
                        style={styles.iconsize}
                        onPress={onPressLeft ?? (() => router.back())}
                        oppositeColorMode={true}/>
                )}
                {title && (
                    <Text style={[styles.title, { color: fontColor }, titleStyle]}>
                        {title}
                    </Text>
                )}
                {showRightBtn && (
                    <IconButton
                        iconName='chevron'
                        direction='right' 
                        style={styles.iconsize}
                        onPress={onPressRight ?? (() => router.back())}
                        oppositeColorMode={true}/>
                )}
            </View>
        </View>
    );
};

export default HeaderTitle;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: TOTAL_MARGIN,
        flexDirection: 'row',
        alignItems: 'center', 
    },
    content: {
        flexDirection: 'row',      
        alignItems: 'center',      
        justifyContent: 'space-between', 
        flex: 1,                  
    },
    title: {
        flex: 1,
        marginLeft: 10,
        marginVertical: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconsize: {
        height: 30,
        width: 30
    }
});
