import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReadMore = () => {
  return (
    <View style={styles.container}>
      <Text>ReadMore</Text>
    </View>
  )
}

export default ReadMore

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})