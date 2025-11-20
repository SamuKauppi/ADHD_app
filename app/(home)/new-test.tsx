import { StyleSheet, View } from 'react-native'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { router } from 'expo-router'
import React from 'react'

// Page to start a new test
const TestAgain = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => router.push('/test')}>
        <Text>Testaa uudelleen</Text>
      </Button>
    </View>
  )
}

export default TestAgain

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})