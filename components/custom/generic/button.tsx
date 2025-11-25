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

type ButtonProps = {
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;          // container layout
  contentStyle?: StyleProp<ViewStyle>;   // content + animated view styling
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
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

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [color, pressedColor],
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, style]}
    >
      {/* Single animated container for background + content */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill, // fill the Pressable
          styles.contentDefault,
          contentStyle,
          { backgroundColor },
        ]}
      >
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        {text && <Text style={[styles.txt, textStyle]}>{text}</Text>}
        {rightIcon && <View style={styles.iconWrapper}>{rightIcon}</View>}
      </Animated.View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  contentDefault: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    zIndex: 1, // ensure content is above any backgrounds
  },
  txt: {
    color: 'white',
  },
  iconWrapper: {
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
