import { StyleSheet, View, ScrollView } from 'react-native'
import { Text } from '@/components/ui/text'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ADHD_ACCORDION } from '@/lib/adhd-accordion'
import { getAdhdType } from '@/lib/adhd-utils'

const ReadMore = () => {
  
  // Search local params for type
  const { typeOfResult } = useLocalSearchParams<{ typeOfResult: string }>()
  if (!typeOfResult) return null;

  // Search type from ADHD_DATA_OTHER
  const selectedType = getAdhdType(ADHD_ACCORDION, typeOfResult);
  if (!selectedType) return null;


  return (
    <>
      <Stack.Screen />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.scrollMargin}>


          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default ReadMore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: '3%'
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: '10%'
  },
  progressWrapper: {
    flex: 1,
    marginRight: 12,
    // IMPORTANT: minWidth: 0 lets the child shrink on iOS/Android
    minWidth: 0,
    alignSelf: 'flex-end',
  },
  scrollMargin: {
    marginHorizontal: '12%'
  },
  title: {
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 35,
  },
  text: {
    marginBottom: 16,
    fontSize: 20,
    lineHeight: 26,
  },
  navigationContainer: {
    marginTop: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    // larger touch target and icon size
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    // slightly larger close icon
    width: 28,
    height: 28,
  },
  progressbar: {
    // passed to StepProgressbar as `buttonStyle` and controls segment height
    height: 6,
    borderRadius: 6,
  }
})