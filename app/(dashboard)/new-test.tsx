import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { APP_HORIZONTAL_MARGIN } from '@/lib/layout'
import { router } from 'expo-router'

import Button from '@/components/custom/generic/button'

// Page to start a new test
const TestAgain = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.inner, { paddingTop: insets.top }] }>
      <Button
        onPress={() => router.push('/test')} 
        text='Testaa uudelleen'/>
    </View>
  )
}

export default TestAgain

const styles = StyleSheet.create({
inner: {
  width: '100%',
  paddingHorizontal: APP_HORIZONTAL_MARGIN,
  alignItems: 'center'
}
})

