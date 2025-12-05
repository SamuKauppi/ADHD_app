import { Pressable, Image, GestureResponderEvent, ImageStyle, useColorScheme, StyleSheet, View, StyleProp } from 'react-native';
import { iconMap } from '@/lib/icons';

type IconButtonProps = {
  iconName: string;                                 // name of the image
  style?: StyleProp<View['props']> | StyleProp<any>; // optional styles for container (flexible)
  imgStyle?: StyleProp<ImageStyle>;                 // optional style for image
  onPress?: (event: GestureResponderEvent) => void; // on press functionality
  direction?: 'left' | 'right' | 'up' | 'down';     // direction the image is facing
  useColorMode?: boolean;                           // whether to use color scheme suffix (default: dark)
  oppositeColorMode?: boolean;                      // whether to use opposite color scheme suffix
}

// Icon that can be pressable
const IconButton = ({
  iconName,
  style,
  imgStyle,
  onPress,
  direction = 'right',
  useColorMode = false,
  oppositeColorMode = false,
}: IconButtonProps) => {
  const scheme = useColorScheme();

  // Determine suffix
  let suffix: 'L' | 'D' = 'D';

  if (useColorMode) {
    suffix = scheme === 'light' ? 'L' : 'D';
  }

  if (oppositeColorMode) {
    suffix = suffix === 'L' ? 'D' : 'L';
  }

  const source = iconMap[`${iconName}${suffix}`];

  if (!source) {
    console.warn(`Icon "${iconName}${suffix}" not found in iconMap.`);
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
    transforms.length ? { transform: transforms as any } : undefined
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
