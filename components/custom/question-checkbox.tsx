// components/custom/QuestionCheckbox.tsx
import { StyleSheet, Pressable, ViewStyle, TextStyle, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Checkbox } from '@/components/ui/checkbox';

type QuestionCheckboxProps = {
  question: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const QuestionCheckbox = ({ question, checked, onChange, style, textStyle }: QuestionCheckboxProps) => {
  const scheme = useColorScheme();
  const theme = THEME[scheme ?? 'light'];

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={[
        styles.container,
        { borderColor: theme.border },
        style,
      ]}>
      <Text style={[styles.text, textStyle]}>
        {question}
      </Text>
      <Checkbox style={styles.checkbox} checked={checked} onCheckedChange={onChange} />
    </Pressable>
  );
};

export default QuestionCheckbox;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 3,
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
  },
  checkbox: {
    transform: [{ scale: 1.5 }],
    marginRight: 10,
    marginLeft: 10,
  }
});
