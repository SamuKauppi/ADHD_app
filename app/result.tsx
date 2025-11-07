import { StyleSheet, ScrollView, View } from 'react-native'
import { Text } from '@/components/ui/text'
import { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage'
import ResultGroup from '@/components/custom/result-group'
import { Stack } from 'expo-router'

const ResultPage = () => {

  // Get value if test has been completed
  const [testCompleted, setTestCompleted] = useState(false)
  useEffect(() => {
    const getTestCompleted = async () => {
      try {
        const value = await AsyncStorage.getItem('testCompleted')
        if (value !== null) {
          setTestCompleted(JSON.parse(value))
        }
      } catch (error) {
        console.error('Error reading testCompleted from AsyncStorage:', error)
      }
    }
    getTestCompleted()
  }, [])

  // No test completed
  if (testCompleted === null || testCompleted == false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No test data available. Please complete the test first.</Text>
      </SafeAreaView>
    )
  }

  // Test has been completed. Display results in ResultGroup
  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <View style={styles.scrollView}>
          <ScrollView >
            <Text style={styles.title}>Tulossivu</Text>
            <Text style={styles.extraText}>Jotain tekstiä adhd tyypeistä</Text>
            <ResultGroup />
          </ScrollView>

        </View>
      </SafeAreaView>
    </>
  )
}

export default ResultPage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  extraText: {

  },
  scrollView: {
    width: '92%',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 50,
  }
})
