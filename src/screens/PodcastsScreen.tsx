import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import PODCASTS_DATA from "../mock/podcasts.json";
import { scaledPixels } from "../hooks/useScale";
import DefaultHeader from "../components/DefaultHeader";
import { useNavigation } from "@react-navigation/native";
const PodcastsScreen = () => {
  // State to track focused elements
  const [focusedPodcast, setFocusedPodcast] = useState(null);
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    const imageUrl = item?.coverImage ?? '';
    return (
      <TouchableHighlight
        onFocus={() => setFocusedPodcast(item?.id)}
        onBlur={() => setFocusedPodcast(null)}
        underlayColor="transparent"
        onPress={() => navigation.navigate("PodcastEpisodes", item)}
        style={styles.videoContainer}
      >
        <View style={{ flex: 1 }}>
          {
            item && (
              <>
                <View
                  style={[
                    styles.videoImageContainer,
                    focusedPodcast === item.id && styles.focusedPodcast,
                  ]}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.videoImage}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.videoTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.videoSpeaker}>{item.hosts[0].name}</Text></>
            )
          }
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with TED logo and search bar */}
      <DefaultHeader title="Podcasts" />
      <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>

        {/* Videos grid */}
        <View style={{ flex: 1, gap: 10 }}>
          <FlatList
            data={[...PODCASTS_DATA.podcasts, null, null, null]}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id ?? ''}
            numColumns={4}
            columnWrapperStyle={styles.videoRow}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  videoRow: {
    justifyContent: "space-evenly",
    marginBottom: 33,
    gap: 33,
  },
  videoContainer: {
    flex: 1,
  },
  videoImageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  focusedPodcast: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 5,
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  videoTitle: {
    color: "#FFFFFF",
    fontSize: scaledPixels(24),
    fontWeight: "bold",
    marginBottom: 4,
  },
  videoSpeaker: {
    color: "#696969",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
  },
});

export default PodcastsScreen;
