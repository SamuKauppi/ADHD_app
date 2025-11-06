import { StyleSheet, useColorScheme, View } from 'react-native'
import { QUESTIONS } from '@/lib/questions'
import { ADHD_TYPE } from '@/lib/adhd-types'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultEntry from './result-entry'
import Spacer from '../ui/Spacer'


type ADHDItem = {
  key: string;
  label: string;
  value: number;
};

const ResultGroup = () => {

  const [adhdArray, setAdhdArray] = useState<ADHDItem[]>(
    Object.entries(ADHD_TYPE).map(([key, label]) => ({
      key,    
      label,
      value: 0,
    }))
  );

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

    setAdhdArray(updatedArray); // trigger re-render
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
    <View style={styles.container}>
      {[...adhdArray] // make a copy so we don’t mutate state
        .sort((a, b) => b.value - a.value) // descending order
        .map(({ key, label, value }, index) => (
          <ResultEntry
            key={index}
            typeKey={key}
            typeLabel={label}
            score={value}
            maxScore={Object.keys(QUESTIONS).length}
            style={styles.resultEntry}
            onPress={handlePress}
          />
        ))
      }
    </View>
  );
}

export default ResultGroup

const styles = StyleSheet.create({
  container: {
    paddingVertical: '10%',
  },
  resultEntry: {
    padding: 10,
    borderWidth: 3,
    marginVertical: 5,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-start',
  }
})