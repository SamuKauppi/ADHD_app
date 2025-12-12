import { StyleSheet, View, ViewStyle } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import ResultEntry from './result-entry';
import { ADHD_TYPE, getADHDImage } from '@/lib/adhd-types';

type ADHDItem = {
  key: string;
  label: string;
  image: any;
  value: number;
};

type ResultProp = {
  style?: ViewStyle;
};

// Loads group of ResultEntries from final stored results
const ResultGroup = ({ style }: ResultProp) => {
  const [adhdArray, setAdhdArray] = useState<ADHDItem[]>([]);

  const loadResults = async () => {
    try {
      const keys = Object.keys(ADHD_TYPE);
      const loadedArray: ADHDItem[] = [];

      for (const key of keys) {
        const value = await AsyncStorage.getItem(`finalResult:${key}`);
        loadedArray.push({
          key,
          label: ADHD_TYPE[key].name,
          image: 'result-mini',
          value: value ? parseFloat(value) : 0,
        });
      }

      // Determine highest type
      const highest = loadedArray.reduce((prev, curr) =>
        curr.value > prev.value ? curr : prev
      );

      setAdhdArray(loadedArray);

    } catch (err) {
      console.warn('Failed to load final results', err);
    }
  };

  const handlePress = (typeKey: string) => {
    router.push({
      pathname: '/info',
      params: {
        typeOfResult: typeKey,
      },
    });
  };

  useEffect(() => {
    loadResults();
  }, []);

  return (
    <View style={[styles.group, style]}>
      {[...adhdArray] // Copy to avoid mutating state
        .sort((a, b) => b.value - a.value) // descending order
        .map(({ key, label, value, image }, index) => (
          <ResultEntry
            key={index}
            typeKey={key}
            typeLabel={label}
            score={value}
            maxScore={100} // assuming percentage values
            imgSource={getADHDImage(key, image)}
            style={styles.resultEntry}
            lablelStyle={styles.resultLabel}
            numberStyle={styles.resultPrecentageLabel}
            onPress={handlePress}
          />
        ))
      }
    </View>
  );
};

export default ResultGroup;

const styles = StyleSheet.create({
  group: {
    width: '100%',
  },
  resultEntry: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resultLabel: {
    textAlign: 'left',
    maxWidth: '60%',
    fontWeight: 'bold',
    fontSize: 19,
  },
  resultPrecentageLabel: {
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
});
