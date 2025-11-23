import Parser from 'rss-parser';

// You can define types for your feed if you have custom fields 
type MyFeed = {
    foo: string;
};
type MyItem = {
    bar: number;
};

const parser = new Parser<MyFeed, MyItem>({
    customFields: {
        feed: ['foo'],      // for example, if your <feed> has a <foo> field
        item: ['bar'],      // custom item field
    },
    // Optional: custom HTTP / request options
    headers: {
        'User-Agent': 'MyApp/1.0',
    },
    timeout: 10000,            // 10s timeout
    requestOptions: {
        // you can configure TLS / rejectUnauthorized etc.
    },
});

export async function fetchRss(url: string) {
    // parseURL works in Node / React Native
    const feed = await parser.parseURL(url);
    return feed;
}

export async function fetchRssFromString(xml: string) {
    const feed = await parser.parseString(xml);
    return feed;
}
