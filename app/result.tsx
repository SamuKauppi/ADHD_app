import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResultPage = () => {
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

  if (testCompleted === null || testCompleted == false) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No test data available. Please complete the test first.</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>ResultPage</Text>
    </SafeAreaView>
  )
}

export default ResultPage

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
