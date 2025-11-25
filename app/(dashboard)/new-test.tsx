import { StyleSheet, View, Text } from 'react-native'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import Button from '@/components/custom/generic/button'
import { router } from 'expo-router'
import React from 'react'

// Page to start a new test
const TestAgain = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => router.push('/test')} 
        text='Testaa uudelleen'/>
    </View>
  )
}

export default TestAgain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: KUTRI_COLORS.background,
  },
})

