import { StyleSheet, View, ViewStyle } from 'react-native'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import IconButton from '../navigation/icon-button'

type CheckboxProps = {
    enabled: boolean;
    style?: ViewStyle;
    color?: string;
}

const Checkbox = ({ enabled, style, color }: CheckboxProps) => {

    return (
        <View
            style={[
                styles.container,
                enabled && styles.enabledContainer,
                style
            ]}
        >
            {enabled && (
                <IconButton iconName='checkmark' style={styles.icon} />
            )}
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: KUTRI_COLORS.cardForeground,
        backgroundColor: KUTRI_COLORS.foreground,
        width: 24,
        height: 24,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    enabledContainer: {
        backgroundColor: KUTRI_COLORS.background
    },
    icon: {
        width: 19,
        height: 19
    }
})
