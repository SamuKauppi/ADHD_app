import Spacer from '@/components/ui/Spacer';
import { KUTRI_COLORS } from '@/lib/brand-colors';
import {APP_HORIZONTAL_TOTAL_MARGIN } from '@/lib/layout';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

type HeaderTitleProps = {
    title: string;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const HeaderTitle = ({
    title = "",
    
    containerStyle,
    titleStyle,
    
}: HeaderTitleProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.content}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                
            </View>
        </View>
    )
}

export default HeaderTitle

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: APP_HORIZONTAL_TOTAL_MARGIN,
        backgroundColor: KUTRI_COLORS.cardForeground,
    },
    content: {
        width: '100%',
    },
    title: {
        marginVertical: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    
})
