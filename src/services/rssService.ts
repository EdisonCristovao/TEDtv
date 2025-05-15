import AsyncStorage from '@react-native-async-storage/async-storage';
import { XMLParser } from 'fast-xml-parser';

interface AcastEpisode {
  title: string;
  description: string;
  pubDate: string;
  duration: string;
  enclosure: {
    url: string;
    type: string;
    length: string;
  };
  guid: string;
}

interface AcastFeed {
  channel: {
    title: string;
    description: string;
    image: {
      url: string;
    };
    item: AcastEpisode[];
  };
}

interface CacheMetadata {
  timestamp: number;
  lastError?: string;
  retryCount: number;
}

export class RSSService {
  private static instance: RSSService;
  private readonly CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second

  private constructor() { }

  public static getInstance(): RSSService {
    if (!RSSService.instance) {
      RSSService.instance = new RSSService();
    }
    return RSSService.instance;
  }

  private async getCacheKey(feedUrl: string, type: 'data' | 'metadata'): Promise<string> {
    return `podcast:${feedUrl}:${type}`;
  }

  private async getCachedData(
    feedUrl: string
  ): Promise<{ data: Podcast; metadata: CacheMetadata } | null> {
    try {
      const dataKey = await this.getCacheKey(feedUrl, 'data');
      const metadataKey = await this.getCacheKey(feedUrl, 'metadata');

      const [cachedData, cachedMetadata] = await Promise.all([
        AsyncStorage.getItem(dataKey),
        AsyncStorage.getItem(metadataKey),
      ]);

      if (!cachedData || !cachedMetadata) return null;

      const data = JSON.parse(cachedData) as Podcast;
      const metadata = JSON.parse(cachedMetadata) as CacheMetadata;

      if (Date.now() - metadata.timestamp > this.CACHE_DURATION) {
        return null;
      }

      return { data, metadata };
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  private async setCachedData(
    feedUrl: string,
    data: Podcast,
    metadata: CacheMetadata
  ): Promise<void> {
    try {
      const dataKey = await this.getCacheKey(feedUrl, 'data');
      const metadataKey = await this.getCacheKey(feedUrl, 'metadata');

      await Promise.all([
        AsyncStorage.setItem(dataKey, JSON.stringify(data)),
        AsyncStorage.setItem(metadataKey, JSON.stringify(metadata)),
      ]);
    } catch (error) {
      console.error('Error writing to cache:', error);
    }
  }

  private async fetchFeed(url: string, retryCount = 0): Promise<AcastFeed> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
      }
      const text = await response.text();
      const parser = new XMLParser({ ignoreAttributes: false });
      const xml = parser.parse(text);
      // Defensive: RSS feeds may have rss.channel or just channel
      const channel = xml.rss?.channel || xml.channel;
      const items = Array.isArray(channel.item) ? channel.item : [channel.item];
      // Debug: log the raw items array
      // eslint-disable-next-line no-console
      const acastFeed: AcastFeed = {
        channel: {
          title: channel.title || '',
          description: channel.description || '',
          image: {
            url: channel.image?.url || channel['itunes:image']?.['@_href'] || '',
          },
          item: items.map((item: Record<string, unknown>) => {
            type Enclosure = { '@_url'?: string; '@_type'?: string; '@_length'?: string };
            type Guid = { '#text'?: string };
            const enclosure = item.enclosure as Enclosure | undefined;
            const guid = item.guid as Guid | string | undefined;
            return {
              title: (item.title as string) || '',
              description:
                (item.description as string) || (item['content:encoded'] as string) || '',
              pubDate: (item.pubDate as string) || '',
              duration: (item['itunes:duration'] as string) || '',
              enclosure: {
                url: enclosure?.['@_url'] || '',
                type: enclosure?.['@_type'] || '',
                length: String(enclosure?.['@_length'] ?? ''),
              },
              guid: typeof guid === 'string' ? guid : String(guid?.['#text'] || ''),
            };
          }),
        },
      };
      return acastFeed;
    } catch (error) {
      if (retryCount < this.MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * (retryCount + 1)));
        return this.fetchFeed(url, retryCount + 1);
      }
      throw error;
    }
  }

  private convertToPodcast(feed: AcastFeed, feedUrl: string): Podcast {
    // Debug: log the entire feed object
    // eslint-disable-next-line no-console
    // console.log('convertToPodcast feed:', feed);
    // Debug: log the raw feed.channel.item with fallback
    // eslint-disable-next-line no-console
    // console.log('convertToPodcast feed.channel.item:', feed.channel?.item ?? 'undefined');
    const items = Array.isArray(feed.channel?.item)
      ? feed.channel.item
      : feed.channel?.item
        ? [feed.channel.item]
        : [];
    const episodes: Episode[] = items.map(item => ({
      id: item.guid,
      title: item.title,
      description: item.description,
      audioUrl: item.enclosure.url,
      duration: this.parseDuration(item.duration),
      publishedAt: new Date(item.pubDate),
    }));

    return {
      title: feed.channel.title,
      description: feed.channel.description,
      coverImage: feed.channel.image.url,
      feedUrl,
      episodes,
    };
  }

  private parseDuration(duration: string): number {
    // Handle different duration formats (e.g., "1:30:00" or "5400")
    if (duration.includes(':')) {
      const parts = duration.split(':').map(Number);
      return parts.reduce((acc, val) => acc * 60 + val, 0);
    }
    return parseInt(duration, 10) || 0;
  }

  public async getPodcast(
    feedUrl: string,
    forceRefresh = false
  ): Promise<{ podcast: Podcast; fromCache: boolean }> {
    try {
      // Check cache first unless forceRefresh
      if (!forceRefresh) {
        const cached = await this.getCachedData(feedUrl);
        if (cached) {
          return { podcast: cached.data, fromCache: true };
        }
      }

      // Fetch and parse feed
      const feed = await this.fetchFeed(feedUrl);
      const podcast = this.convertToPodcast(feed, feedUrl);

      // Update cache with success metadata
      await this.setCachedData(feedUrl, podcast, {
        timestamp: Date.now(),
        retryCount: 0,
      });

      return { podcast, fromCache: false };
    } catch (error) {
      // If we have cached data, return it even if it's expired
      const cached = await this.getCachedData(feedUrl);
      if (cached) {
        return { podcast: cached.data, fromCache: true };
      }

      // Update cache with error metadata
      const metadata: CacheMetadata = {
        timestamp: Date.now(),
        lastError: error instanceof Error ? error.message : 'Unknown error',
        retryCount: 0,
      };

      // Store empty podcast data with error metadata
      const emptyPodcast: Podcast = {
        title: '',
        description: '',
        coverImage: '',
        feedUrl,
        episodes: [],
      };
      await this.setCachedData(feedUrl, emptyPodcast, metadata);
      throw error;
    }
  }

  public async clearCache(feedUrl?: string) {
    try {
      if (feedUrl) {
        const dataKey = await this.getCacheKey(feedUrl, 'data');
        const metadataKey = await this.getCacheKey(feedUrl, 'metadata');
        await Promise.all([AsyncStorage.removeItem(dataKey), AsyncStorage.removeItem(metadataKey)]);
      } else {
        const keys = await AsyncStorage.getAllKeys();
        const podcastKeys = keys.filter(key => key.startsWith('podcast:'));
        await AsyncStorage.multiRemove(podcastKeys);
      }
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export async function getLatestEpisodeForPodcast(feedUrl: string): Promise<Episode[] | null> {
  const service = RSSService.getInstance();
  try {
    const { podcast } = await service.getPodcast(feedUrl);
    if (podcast.episodes && podcast.episodes.length > 0) {
      // Sort by publishedAt descending, just in case
      const sorted = [...podcast.episodes].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      sorted.splice(0, 10);
      return sorted;
    }
    return null;
  } catch (e) {
    console.error('Failed to get latest episode for', feedUrl, e);
    return null;
  }
}
