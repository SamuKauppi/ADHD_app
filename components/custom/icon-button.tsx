import { Pressable, Image, GestureResponderEvent, ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native'
import React from 'react'

type IconButtonProps = {
  source: ImageSourcePropType
  style?: ViewStyle
  imgStyle?: ImageStyle
  onPress?: (event: GestureResponderEvent) => void
}

const IconButton = ({ source, style, imgStyle, onPress }: IconButtonProps) => {
  return (
    <Pressable style={style} onPress={onPress}>
      <Image 
        style={imgStyle}
        source={source}
      />
    </Pressable>
  )
}

export default IconButton
