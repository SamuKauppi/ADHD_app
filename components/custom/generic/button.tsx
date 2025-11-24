import { Pressable, StyleSheet, Text, TextStyle, ViewStyle, type StyleProp, View } from 'react-native'

type ButtonProps = {
    text?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
}


const Button = ({ text, onPress, style, textStyle, leftIcon, rightIcon, disabled }: ButtonProps) => {
    return (
        <Pressable style={[styles.container, style]} onPress={onPress} disabled={disabled}>
            {leftIcon ? <View style={styles.iconWrapper}>{leftIcon}</View> : null}
            {text ? <Text style={[styles.txt, textStyle]}>{text}</Text> : null}
            {rightIcon ? <View style={styles.iconWrapper}>{rightIcon}</View> : null}
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: '50%',
        height: 50,
        padding: 5,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    txt: {
        color: 'white',
    }
    ,
    iconWrapper: {
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})