import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Linking, Dimensions } from 'react-native'
import RenderHTML from 'react-native-render-html'
import { fetchRss } from '@/components/custom/functions/rss-parser'
import { KUTRI_COLORS } from '@/lib/brand-colors'
import { APP_HORIZONTAL_SCROLL_PADDING } from '@/lib/layout'
import Spacer from '@/components/ui/Spacer'

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

  if (loading) return <ActivityIndicator color={KUTRI_COLORS.cardForeground} />
  if (error) return <Text style={styles.error}>Feed error: {error}</Text>

  return (
    <FlatList
      style={styles.list}
      data={items}
      keyExtractor={(item, idx) => (item.link ?? item.title ?? String(idx))}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => item.link && Linking.openURL(item.link)}
          style={[styles.item, index === 0 && { marginTop: 10 }]}
        >
          <Text style={styles.title}>{item.title}</Text>
          {item.pubDate ? <Text style={styles.date}>{item.pubDate}</Text> : null}
          {item.contentSnippet ? (
            // Render HTML content. Use RenderHTML for proper HTML rendering in RN.
            <View style={styles.htmlWrapper}>
              <RenderHTML
                contentWidth={Dimensions.get('window').width - 32}
                source={{ html: item.contentSnippet }}
                baseStyle={styles.snippet}
              />
            </View>
          ) : null}
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: APP_HORIZONTAL_SCROLL_PADDING,
  },
  item: {
    padding: 12,
    backgroundColor: KUTRI_COLORS.foreground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: KUTRI_COLORS.cardForeground,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#666',
    fontSize: 12,
    marginBottom: 6,
  },
  snippet: {
    color: '#222',
    // Allow rendered HTML to flow naturally; RenderHTML will apply styles
    lineHeight: 18,
  },
  htmlWrapper: {
    marginTop: 6,
    // Make sure the HTML block stretches within the item padding
    alignSelf: 'stretch',
  },
  sep: { height: 10 },
  error: { color: 'red' }
})

