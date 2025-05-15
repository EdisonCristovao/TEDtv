import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getLatestEpisodeForPodcast } from '../services/rssService';
import { scaledPixels } from '../hooks/useScale';
import { SpatialNavigationRoot, SpatialNavigationScrollView, SpatialNavigationView } from 'react-tv-space-navigation';
import Typography from '../components/Typography';
import FocusablePressable from '../components/FocusablePressable';
import DefaultHeader from '../components/DefaultHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { format } from 'date-fns';
import Icon from "react-native-vector-icons/FontAwesome5";

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const PodcastEpisodesScreen = () => {
  const { params } = useRoute();
  const { id, title, description, shortDescription, hosts, coverImage, feedUrl, language, acastUrl } = params as Podcast;
  const [isLoading, setIsLoading] = useState(true);

  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetchEpisodes();
  }, [acastUrl]);

  const fetchEpisodes = async () => {
    setIsLoading(true);
    try {
      const episodes = await getLatestEpisodeForPodcast(acastUrl);
      episodes.splice(0, 10);
      console.log(episodes[0]);
      setEpisodes(episodes);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setIsLoading(false);
    };
  };


  const renderEpisode = (episode: Episode) => {
    return (
      <TouchableHighlight key={episode.id} onPress={() => { }} style={styles.episode}>
        <>
          <Icon name="play" size={20} color='white' />
          <View style={styles.episodeInfo}>
            <Typography variant='body1' color='white'>{episode.title}</Typography>
            <View style={styles.episodeDuration}>
              <Typography variant='body1' color='white'>{format(new Date(episode.publishedAt), 'MMM d, yyyy')}</Typography>
              <Typography variant='body1' color='white'>{formatDuration(episode.duration)}</Typography>
            </View>
          </View></>
      </TouchableHighlight>
    )
  }

  console.log(hosts)

  return (
    <SpatialNavigationRoot>
      <View style={styles.container}>
        <LinearGradient
          colors={["#000000", "#1B1B1B", "transparent"]}
          locations={[0.025, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={StyleSheet.absoluteFillObject}
        />
        <DefaultHeader title={title} />
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: coverImage }} style={styles.image} resizeMode="contain" />
            <Typography variant='h2' color='white'>{hosts[0].name} | {hosts[0].role}</Typography>
            <Typography style={{ marginHorizontal: scaledPixels(100) }} variant='h2' color='white'>{description}</Typography>
          </View>
          <SpatialNavigationScrollView style={styles.scrollView} horizontal={false}>
            <SpatialNavigationView direction='vertical' style={styles.episodesContainer}>
              <FlatList
                data={episodes}
                tvFocusable
                renderItem={({ item }) => renderEpisode(item)}
                keyExtractor={(item) => item.id}
              />
            </SpatialNavigationView>
          </SpatialNavigationScrollView>
        </View>
      </View>
    </SpatialNavigationRoot>
  )
}

export default PodcastEpisodesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scaledPixels(40),
    backgroundColor: '#111111',
  },
  content: {
    flexDirection: 'row',
    marginTop: scaledPixels(40),
  },
  image: {
    width: '50%',
    height: 'auto',
    aspectRatio: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    gap: scaledPixels(50),
  },
  episodesContainer: {
    gap: scaledPixels(10),
  },
  episodeInfo: {
    width: '100%',
    flexDirection: 'column',
    gap: scaledPixels(6),
  },
  episodeDuration: {
    flexDirection: 'row',
    gap: scaledPixels(4),
  },
  episode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaledPixels(20),
    borderBottomWidth: 1,
    marginBottom: scaledPixels(10),
    backgroundColor: '#111111',
    padding: scaledPixels(10),
    paddingBottom: scaledPixels(20),
    borderColor: 'gray',
  },
});
