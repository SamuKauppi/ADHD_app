import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import { KUTRI_COLORS } from '@/lib/brand-colors';

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;          // container layout
  contentStyle?: StyleProp<ViewStyle>;   // content + animated view styling
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  disabledColor?: string;
  color?: string;
  pressedColor?: string;
  fadeDuration?: number;
};

const Button = ({
  text,
  onPress,
  style,
  contentStyle,
  textStyle,
  leftIcon,
  rightIcon,
  disabled = false,
  color = 'black',
  pressedColor = 'white',
  disabledColor = '#e7e7e7ff',
  fadeDuration = 200,
}: ButtonProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => anim.setValue(1); // immediate pressed color
  const handlePressOut = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: fadeDuration,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = disabled
    ? disabledColor
    : anim.interpolate({
      inputRange: [0, 1],
      outputRange: [color, pressedColor],
    });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, style, disabled ? styles.disabledContainer : undefined]}
    >
      {/* Animated background */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor },
          { borderRadius: 10 }, // match container
        ]}
      />
      {/* Content */}
      <View style={[styles.contentDefault, contentStyle]}>
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        {text && <Text style={[styles.txt, textStyle, disabled && { opacity: 0.25 }]}>{text}</Text>}
        {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
      </View>
    </Pressable>

  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 150,       // fallback fixed width
    height: 50,       // fallback fixed height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  contentDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // above background
  },
  txt: {
    color: 'white',
    fontWeight: '600',
  },
  iconWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledContainer: {
    opacity: 0.7,
  },
});
