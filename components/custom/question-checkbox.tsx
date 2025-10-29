import { StyleSheet, View, ViewStyle, TextStyle, useColorScheme, Pressable } from 'react-native'
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Checkbox } from '@/components/ui/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage'

import React, { useEffect, useState } from 'react'

type QuestionCheckboxProps = {
  question: string;
  storageKey: string;
  // optional 
  style?: ViewStyle;        // style 
  textStyle?: TextStyle;    // optional style for the text
}

const QuestionCheckbox = ({ question, storageKey, style, textStyle }: QuestionCheckboxProps) => {

  const scheme = useColorScheme();
  const theme = THEME[scheme ?? 'light'];
  const key = storageKey;

  const [checked, setChecked] = useState<boolean>(false)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key)
        if (!mounted) return
        if (raw !== null) {
          const val = JSON.parse(raw)
          setChecked(val)
        } else {
          setChecked(false)
        }
      } catch (error) {
        console.warn('Failed to load checkbox state', key, error)
      }
    })()

    return () => {
      mounted = false
    }
  }, [key])

  const handleChange = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      setChecked(value)
      console.log('Saved checkbox state', key, value)
    } catch (error) {
      console.warn('Failed to save checkbox state', key, error)
    }
  }

  return (
    <Pressable
      onPress={() => handleChange(!checked)}
      style={[
        styles.container,
        { borderColor: theme.border },
        style,
      ]}>
      <Text style={[styles.text, textStyle]}>
        {question}
      </Text>
      <Checkbox style={styles.checkbox} checked={checked} onCheckedChange={handleChange} />
    </Pressable>
  )
}

export default QuestionCheckbox

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 3,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    // allow text to wrap and take remaining space
    flex: 1,
    marginRight: 12,
  },
  checkbox: {
    transform: [{ scale: 1.5 }],
    marginRight: 10,
    marginLeft: 10,
  }
})
