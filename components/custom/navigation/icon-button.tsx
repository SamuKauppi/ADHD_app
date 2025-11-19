import { Pressable, Image, GestureResponderEvent, ViewStyle, ImageStyle, useColorScheme, StyleSheet, View, StyleProp } from 'react-native';
import { iconMap } from '@/lib/icon';

type IconButtonProps = {
  iconName: string;                                 // name of the image
  style?: ViewStyle;                                // optional styles for container
  imgStyle?: StyleProp<ImageStyle>;                 // optional style for image
  onPress?: (event: GestureResponderEvent) => void; // on press functionality
  oppositeColor?: boolean;                          // swap colors (TODO: remove if no dark mode support)
  direction?: 'left' | 'right' | 'up' | 'down';     // direction the image is facing
}

// Icon that can be pressable
const IconButton = ({
  iconName,
  style,
  imgStyle,
  onPress,
  oppositeColor,
  direction = 'right',
}: IconButtonProps) => {
  const scheme = useColorScheme();
  const color = !oppositeColor ? 'light' : 'dark';
  const themeSuffix = scheme === color ? 'D' : 'L';

  const source = iconMap[`${iconName}${themeSuffix}`];

  if (!source) {
    console.warn(`Icon "${iconName}${themeSuffix}" not found in iconMap.`);
    return null;
  }

  // Determine transforms
  const transforms: { rotate?: string; scaleX?: number }[] = [];
  if (direction === 'left') transforms.push({ scaleX: -1 });
  if (direction === 'up') transforms.push({ rotate: '-90deg' });
  if (direction === 'down') transforms.push({ rotate: '90deg' });

  const imageStyles: StyleProp<ImageStyle> = [
    styles.icon,
    imgStyle,
    transforms.length ? { transform: transforms as any } : undefined, // cast to any to satisfy TypeScript
  ];

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={style} hitSlop={8}>
        <Image style={imageStyles} source={source} />
      </Pressable>
    );
  }

  return (
    <View style={style}>
      <Image style={imageStyles} source={source} />
    </View>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
});
