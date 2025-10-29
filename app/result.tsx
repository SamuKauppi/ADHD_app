import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ResultPage = () => {
  const [testCompleted, setTestCompleted] = useState(null)

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

  return (
    <View style={styles.container}>
      <Text>ResultPage</Text>
      <Text>Test Completed: {String(testCompleted ? true : false)}</Text>
    </View>
  )
}

export default ResultPage

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})
