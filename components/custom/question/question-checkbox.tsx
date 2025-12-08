import { StyleSheet, Pressable, ViewStyle, TextStyle, Text } from 'react-native';
import { useState } from 'react';
import Checkbox from './checkbox';
import { KUTRI_COLORS } from '@/lib/brand-colors';

type QuestionCheckboxProps = {
  question: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const QuestionCheckbox = ({ question, checked, onChange, style, textStyle }: QuestionCheckboxProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.container,
        { borderColor: KUTRI_COLORS.cardForeground, backgroundColor: pressed ? KUTRI_COLORS.background : KUTRI_COLORS.foreground },
        style,
      ]}
    >
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
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
});