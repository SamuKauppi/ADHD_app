// components/custom/QuestionCheckbox.tsx
import { StyleSheet, Pressable, ViewStyle, TextStyle, Text, GestureResponderEvent } from 'react-native';
import { useState, useRef } from 'react';
import Checkbox from './checkbox';
import { KUTRI_COLORS } from '@/lib/brand-colors';

type QuestionCheckboxProps = {
  question: string;                 
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

// Pressable containing text and a checkbox
// Used in QuestionGroup
const TAP_MOVE_THRESHOLD = 8; // px

const QuestionCheckbox = ({ question, checked, onChange, style, textStyle }: QuestionCheckboxProps) => {
  const [pressed, setPressed] = useState(false);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const isSwipeRef = useRef(false);

  const backgroundColor = pressed ? KUTRI_COLORS.background : KUTRI_COLORS.foreground;

  const handlePressIn = (e: GestureResponderEvent) => {
    setPressed(true);
    isSwipeRef.current = false;
    const { pageX, pageY } = e.nativeEvent;
    startRef.current = { x: pageX, y: pageY };
  };

  const handleTouchMove = (e: GestureResponderEvent) => {
    const start = startRef.current;
    if (!start) return;
    const { pageX, pageY } = e.nativeEvent;
    const dx = Math.abs(pageX - start.x);
    const dy = Math.abs(pageY - start.y);
    if (dx > TAP_MOVE_THRESHOLD || dy > TAP_MOVE_THRESHOLD) {
      // treat as swipe — cancel pressed visual state
      isSwipeRef.current = true;
      setPressed(false);
    }
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    setPressed(false);
    const start = startRef.current;
    if (!start) return;
    const { pageX, pageY } = e.nativeEvent;
    const dx = Math.abs(pageX - start.x);
    const dy = Math.abs(pageY - start.y);
    // If movement was small and we didn't detect a swipe, treat as tap and toggle
    if (!isSwipeRef.current && dx <= TAP_MOVE_THRESHOLD && dy <= TAP_MOVE_THRESHOLD) {
      onChange(!checked);
    }
    startRef.current = null;
    isSwipeRef.current = false;
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onTouchMove={handleTouchMove}
      style={[
        styles.container,
        { borderColor: KUTRI_COLORS.cardForeground, backgroundColor },
        style,
      ]}>
      <Text style={[styles.text, textStyle]}>
        {question}
      </Text>

      <Checkbox enabled={checked} />
    </Pressable>
  );
};

export default QuestionCheckbox;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    marginRight: 12,
  }
});
