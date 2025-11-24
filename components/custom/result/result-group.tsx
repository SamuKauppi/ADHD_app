import { StyleSheet, View, ViewStyle, Text } from 'react-native'
import { QUESTIONS } from '@/lib/questions'
import { ADHD_TYPE, getADHDImage } from '@/lib/adhd-types'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultEntry from './result-entry'

type ADHDItem = {
  key: string;
  label: string;
  image: any;
  value: number;
}

type ResultProp = {
  style?: ViewStyle;
}

// Loads group of ResultEntries
// Values for them are from AsyncStorage which were stored during test
const ResultGroup = ({style}:ResultProp) => {

  const [adhdArray, setAdhdArray] = useState<ADHDItem[]>(
    Object.entries(ADHD_TYPE).map(([key, { name }]) => ({
      key,
      label: name,
      image: 'result-mini',
      value: 0,
    }))
  );
  const [highestTypeLabel, setHighestTypeLabel] = useState<string>('Tulossivu');
  const questionCount = Object.keys(QUESTIONS).length;

  const checkAndIncrement = async (questionKey: string, optionIndex: number): Promise<boolean> => {
    const storageKey = `${questionKey}:${optionIndex}`

    try {
      const storedValue = await AsyncStorage.getItem(storageKey)
      if (storedValue === 'true') {
        return true
      }

      return false
    } catch (err) {
      console.error('Error reading AsyncStorage', err)
      return false
    }
  }

  async function iterateThroughQuestions() {

    const updatedArray = adhdArray.map(item => ({ ...item, value: 0 }));

    for (const questionKey of Object.keys(QUESTIONS)) {

      let optionsLength = QUESTIONS[questionKey].options.length

      for (let i = optionsLength - 1; i >= 0; i--) {

        const isSelected = await checkAndIncrement(questionKey, i);

        if (isSelected) {
          if (i === optionsLength - 1) break;

          updatedArray[i] = {
            ...updatedArray[i],
            value: updatedArray[i].value + 1
          };
        }
      }
    }

    // Store results for later use
    for (const item of updatedArray) {
      const persentageValue = (questionCount / item.value) * 100;
      await AsyncStorage.setItem(`result:${item.key}`, persentageValue.toString());
    }

    // Store best result
    let highest = updatedArray[0];
    for (const item of updatedArray) {
      if (item.value > highest.value) {
        highest = item;
      }
    }
    await AsyncStorage.setItem('result:highest', highest.key);

    setAdhdArray(updatedArray); // trigger re-render
    setHighestTypeLabel(highest.label);
  }

  const handlePress = (typeKey: string) => {
    router.push({
      pathname: '/info',
      params: {
        typeOfResult: typeKey
      }
    })
  }

  useEffect(() => {
    iterateThroughQuestions();
  }, [])


  return (
    <View style={style}>

      <Text style={styles.title}>{`Tulokset`}</Text>
      <Text style={styles.extraText}>Jotain tekstiä adhd tyypeistä</Text>
      {[...adhdArray] // make a copy so we don’t mutate state
        .sort((a, b) => b.value - a.value) // descending order
        .map(({ key, label, value, image }, index) => (
          <ResultEntry
            key={index}
            typeKey={key}
            typeLabel={label}
            score={value}
            maxScore={questionCount}
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
}

export default ResultGroup

const styles = StyleSheet.create({
  resultEntry: {
    borderWidth: 3,
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
    fontSize: 19
  },
  resultPrecentageLabel: {
    width: 60,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 35,
    lineHeight: 40,
  },
  extraText: {
    marginBottom: 20,
    marginTop: 5,
    fontSize: 18
  },
});