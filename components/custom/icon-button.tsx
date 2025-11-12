import { Pressable, Image, GestureResponderEvent, ViewStyle, ImageStyle, useColorScheme, StyleSheet, View } from 'react-native'
import { iconMap } from '@/lib/icon';

type IconButtonProps = {
  /** base name of the icon file, without L/D or .png */
  iconName: string
  style?: ViewStyle
  imgStyle?: ImageStyle
  onPress?: (event: GestureResponderEvent) => void
  oppositeColor?: boolean
  mirror?: boolean
}

const IconButton = ({ iconName, style, imgStyle, onPress, oppositeColor, mirror }: IconButtonProps) => {

 const scheme = useColorScheme();
  const color = !oppositeColor ? 'light' : 'dark';
  const themeSuffix = scheme === color ? 'D' : 'L';

  const source = iconMap[`${iconName}${themeSuffix}`];

  if (!source) {
    console.warn(`Icon "${iconName}${themeSuffix}" not found in iconMap.`);
    return null;
  }

  const imageStyles = [
    styles.icon,
    imgStyle,
    mirror && { transform: [{ scaleX: -1 }] }
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
}

export default IconButton

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
    objectFit: 'fill'
  },
});