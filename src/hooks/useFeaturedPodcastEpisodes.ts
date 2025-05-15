import { useEffect, useState } from "react";
import PODCASTS_DATA from "../mock/podcasts.json";
import { getLatestEpisodeForPodcast } from "../services/rssService";
import { useNavigation } from "@react-navigation/native";

export function useFetchPodcastEpisodes() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchLatestEpisodes(podcast: Podcast) {
    setIsLoading(true);
    try {

      const latestEpisode = await getLatestEpisodeForPodcast(podcast.acastUrl);
      return {
        podcastTitle: podcast.title,
        podcastCover: podcast.coverImage,
        episodeTitle: latestEpisode?.title || 'No episodes available',
        episodeDescription: latestEpisode?.description || podcast.shortDescription,
        onPress: () => {
          if (latestEpisode?.id) {
            navigation.navigate("PodcastEpisodePlayer", latestEpisode);
          } else {
            navigation.navigate("PodcastEpisodePlayer", podcast);
          }
        },
      };

      setFeaturedItems(items);
    } catch (error) {
      console.error('Error fetching featured episodes:', error);
      // Fallback to using podcast descriptions if episode fetch fails
      const fallbackItems = featuredIds
        .map(id => PODCASTS_DATA.podcasts.find(p => p.id === id))
        .filter((podcast): podcast is (typeof PODCASTS_DATA.podcasts)[number] => Boolean(podcast))
        .map(podcast => ({
          podcastTitle: podcast.title,
          podcastCover: podcast.coverImage,
          episodeTitle: 'Latest Episode',
          episodeDescription: podcast.shortDescription,
          onPress: () => navigation.navigate("PodcastEpisodePlayer", podcast),
        }));
      setFeaturedItems(fallbackItems);
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchLatestEpisodes, isLoading };
}