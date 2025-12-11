import React, { useRef, useEffect } from 'react';
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

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
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
  fadeDuration = 100,
}: ButtonProps) => {
  const anim = useRef(new Animated.Value(0)).current;
  const isPressed = useRef(false);

  const updateAnimation = (toValue: number) => {
    Animated.timing(anim, {
      toValue,
      duration: fadeDuration,
      useNativeDriver: false,
    }).start();
  };

  // Reset animation whenever disabled changes
  useEffect(() => {
    if (disabled) {
      anim.stopAnimation(); // stop any ongoing animation
      anim.setValue(0);     // reset to default
      isPressed.current = false;
    }
  }, [disabled, anim]);

  const handlePressIn = () => {
    if (!disabled) {
      isPressed.current = true;
      anim.stopAnimation();
      anim.setValue(1);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      isPressed.current = false;
      updateAnimation(0);
    }
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
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor },
          { borderRadius: 10 },
        ]}
      />
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
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  contentDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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
