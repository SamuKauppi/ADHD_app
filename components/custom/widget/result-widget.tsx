import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import { SCROLL_CONTENT_HORIZONTAL_MARGIN  } from '@/lib/layout'
import { getSortedResults } from '../functions/get-sorted-results'
import Widget from './widget'
import { ADHD_TYPE } from '@/lib/adhd-types'

const ResultWidget = () => {

  const [sortedResults, setSortedResults] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getSortedResults();
      setSortedResults(results);
    };

    fetchResults();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ADHD TYYPPISI
      </Text>
      <View style={styles.widgetStyle}>
        {Object.entries(sortedResults).map(([key, value]) => (
          <Widget key={key} title={ADHD_TYPE[key].name} value={value}/>
        ))}
      </View>
    </View>
  )
}

export default ResultWidget

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: KUTRI_COLORS.cardForeground,
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    fontSize: 25,
  },
  widgetStyle: {
    marginTop: 10
  }
  
})