// Lightweight RSS fetch + parser implemented for React Native environments.
// The 'rss-parser' package depends on Node http/https and cannot be imported in Expo-managed React Native.
// This implementation fetches the XML and performs a simple extraction of <item> entries.

type SimpleFeedItem = {
    title?: string
    link?: string
    pubDate?: string
    contentSnippet?: string
}

export async function fetchRss(url: string): Promise<{ items: SimpleFeedItem[] }> {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed to fetch feed: ${res.status}`)
    const xml = await res.text()
    return parseRssString(xml)
}

export async function fetchRssFromString(xml: string): Promise<{ items: SimpleFeedItem[] }> {
    return parseRssString(xml)
}

function extractTag(content: string, tag: string): string | undefined {
    // Match both plain tags and namespaced tags like <content:encoded>.
    const re = new RegExp(`<(?:(?:\\w+:)?${tag})[^>]*>([\\s\\S]*?)<\\/(?:\\w+:)?${tag}>`, 'i')
    const m = content.match(re)
    if (m && m[1]) {
        // strip CDATA
        return m[1].replace(/^<!\[CDATA\[|\]\]>$/g, '').trim()
    }

    // If not found, attempt to extract href from a self-closing or attribute-based tag, e.g. <link href="..." />
    const attrRe = new RegExp(`<(?:(?:\\w+:)?${tag})[^>]*?href=["']([^"']+)["'][^>]*\/?>`, 'i')
    const a = content.match(attrRe)
    if (a && a[1]) return a[1].trim()

    return undefined
}

function parseRssString(xml: string) {
    const items: SimpleFeedItem[] = []
    const itemRe = /<item[\s\S]*?>[\s\S]*?<\/item>/gi
    const matches = xml.match(itemRe) || []
    for (const itemXml of matches) {
        const title = extractTag(itemXml, 'title')

        // link can be in <link>text</link>, <link href="..." />, or <guid>
        let link = extractTag(itemXml, 'link')
        if (!link) link = extractTag(itemXml, 'guid')

        // pubDate variants
        let pubDate = extractTag(itemXml, 'pubDate')
        if (!pubDate) {
            pubDate = extractTag(itemXml, 'published') || extractTag(itemXml, 'dc:date')
        } 
        
        // Format pubDate to a more readable form
        if (pubDate) {
            const d = new Date(pubDate)
            if (!isNaN(d.getTime())) {
                const formatter = new Intl.DateTimeFormat('fi-FI', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                pubDate = formatter.format(d)
            }
        }

        // content/description variants
        let description = extractTag(itemXml, 'description')
        if (!description) description = extractTag(itemXml, 'content:encoded') || extractTag(itemXml, 'summary')

        items.push({ title, link })
    }
    return { items }
}
