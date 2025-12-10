import { useCallback } from 'react';
import { Platform, useColorScheme } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';

type NavbarProps = {
  buttonStyle?: 'light' | 'dark'; // optional
};

const NavbarStyle = ({ buttonStyle }: NavbarProps) => {
  const colorScheme = useColorScheme(); // 'light' | 'dark'

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS === 'android') {
        const styleToApply =
          buttonStyle ?? (colorScheme === 'dark' ? 'light' : 'dark'); // use prop if given, otherwise invert system theme
        NavigationBar.setButtonStyleAsync(styleToApply);
      }
    }, [buttonStyle, colorScheme])
  );

  return null;
};

export default NavbarStyle;
