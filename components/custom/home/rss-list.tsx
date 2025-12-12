import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Linking } from 'react-native'
import { fetchRss } from '@/components/custom/functions/rss-parser'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import Button from '../navigation/button'
import { BORDER_COLOR } from '@/lib/layout'

type RssItem = {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
}

type Props = {
  url: string
  limit?: number
  // space (in px) from the right edge where the scrollbar should be inset
  scrollbarInset?: number
}

export default function RssList({ url, limit = 10, scrollbarInset = 16 }: Props) {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<RssItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)

    fetchRss(url)
      .then(feed => {
        if (!mounted) return
        const list = (feed.items || []).slice(0, limit).map(i => ({
          title: i.title,
          link: i.link,
          pubDate: i.pubDate,
          contentSnippet: (i as any).contentSnippet || (i as any).content || ''
        }))
        setItems(list)
      })
      .catch(err => {
        console.warn('Failed to fetch RSS', err)
        if (mounted) setError(String(err))
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => { mounted = false }
  }, [url, limit])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={KUTRI_COLORS.cardForeground} />
      </View>
    )
  }

  if (error) return <Text style={styles.error}>Feed error: {error}</Text>

  return (
    <FlatList
      scrollEnabled={false}
      style={styles.list}
      data={items}
      keyExtractor={(item, idx) => (item.link ?? item.title ?? String(idx))}
      renderItem={({ item, index }) => (
        <Button
          key={index}
          style={styles.item}
          contentStyle={styles.itemContent}
          textStyle={styles.title}
          color='white'
          pressedColor={KUTRI_COLORS.background}
          text={item.title}
          onPress={() => {
            if (item.link) {
              Linking.openURL(item.link)
            } else {
              Linking.openURL('http://kutri.net/ADHD')
            }
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    width: '100%',
    height: 'auto'
  },
  itemContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 18,
    color: 'black',
    textAlign: 'left',
  },
  date: {
    color: '#666',
    fontSize: 14,
    marginBottom: 6,
  },
  snippet: {
    color: '#222',
    // Allow rendered HTML to flow naturally; RenderHTML will apply styles
    lineHeight: 18,
    fontSize: 16
  },
  htmlWrapper: {
    marginTop: 6,
    // Make sure the HTML block stretches within the item padding
    alignSelf: 'stretch',
  },
  sep: { height: 10 },
  error: { color: 'red' }
})

