import { StyleSheet } from 'react-native'
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
        <ResultGroup />
      </SafeAreaView>
    </>
  )
}

export default ResultPage

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '95%'
  }
})
