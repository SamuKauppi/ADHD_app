import { Pressable, Image, GestureResponderEvent, ViewStyle, ImageStyle, useColorScheme, StyleSheet } from 'react-native'
import { iconMap } from '@/lib/icon';

type IconButtonProps = {
  /** base name of the icon file, without L/D or .png */
  iconName: string
  style?: ViewStyle
  imgStyle?: ImageStyle
  onPress?: (event: GestureResponderEvent) => void
}

const IconButton = ({ iconName, style, imgStyle, onPress }: IconButtonProps) => {

  const scheme = useColorScheme();
  const themeSuffix = scheme === 'light' ? 'D' : 'L'

  const source = iconMap[`${iconName}${themeSuffix}`]

  if (!source) {
    console.warn(`Icon "${iconName}${themeSuffix}" not found in iconMap.`)
    return null
  }

  return (
    <Pressable onPress={onPress} style={style} hitSlop={8}>
      <Image style={[styles.icon, imgStyle]} source={source} />
    </Pressable>
  )
}

export default IconButton

const styles = StyleSheet.create({
  icon: {
    height: '100%',
    width: '100%',
    objectFit: 'fill'
  },
});