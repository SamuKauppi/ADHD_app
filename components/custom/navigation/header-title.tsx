import { KUTRI_COLORS } from '@/lib/brand-colors';
import { APP_HORIZONTAL_TOTAL_MARGIN } from '@/lib/layout';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HeaderTitleProps = {
    title?: string;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const HeaderTitle = ({
    title,
    containerStyle,
    titleStyle,
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
                {title && title.trim().length > 0 && (
                    <Text style={[styles.title, { color: fontColor }, titleStyle]}>
                        {title}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default HeaderTitle;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: APP_HORIZONTAL_TOTAL_MARGIN,
    },
    content: {
        width: '100%',
    },
    title: {
        marginVertical: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
});
