import { View, Text, StyleSheet } from "react-native";
import TedLogo from "../components/TedLogo";
import HeaderTitle from "../components/HeaderTitle";
import { scaledPixels } from "../hooks/useScale";
import { LinearGradient } from "expo-linear-gradient";
import {
  SpatialNavigationScrollView,
  SpatialNavigationView,
  SpatialNavigationRoot,
} from "react-tv-space-navigation";
import { useCallback, useState } from "react";
import TalkCard from "../components/TalkCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const MyLibrary = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [focusedIndex, setFocusedIndex] = useState(0);

  const renderScrollableRow = useCallback(
    (title: string) => {
      return (
        <View style={styles.highlightsContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.highlightsTitle}>{title}</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={48}
              color="rgba(255, 255, 255, 0.75)"
            />
          </View>
          <SpatialNavigationScrollView horizontal>
            <SpatialNavigationView
              direction="horizontal"
              style={{
                flexDirection: "row",
                gap: scaledPixels(50),
                overflow: "scroll",
              }}
            >
              {moviesData.map((item, index) => (
                <TalkCard
                  key={`${item.id}-${index}`}
                  talk={item}
                  onFocus={() => {
                    setFocusedIndex(index);
                  }}
                  onSelect={() => {
                    navigation.navigate("Details", {
                      title: item.title,
                      description: item.description,
                      headerImage: item.headerImage,
                      movie: item.movie,
                    });
                  }}
                />
              ))}
            </SpatialNavigationView>
          </SpatialNavigationScrollView>
        </View>
      );
    },
    [styles]
  );
  return (
    <SpatialNavigationRoot>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TedLogo />
            <HeaderTitle title="My Library" />
          </View>

          <View style={styles.textContainer}>
            <View style={[styles.textView, styles.textActive]}>
              <Text style={styles.text}>All</Text>
            </View>
            <View style={[styles.textView]}>
              <Text style={styles.text}>Keep Watching</Text>
            </View>
            <View style={[styles.textView]}>
              <Text style={styles.text}>Keep Listening</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <LinearGradient
            colors={["#7a1f1f", "transparent"]}
            locations={[0.2, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBar}
          />
          <SpatialNavigationScrollView
            offsetFromStart={scaledPixels(60)}
            style={styles.scrollContent}
          >
            {renderScrollableRow("Keep Watching")}
            {renderScrollableRow("Keep Listening")}
          </SpatialNavigationScrollView>
        </View>
      </View>
    </SpatialNavigationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    paddingHorizontal: scaledPixels(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "black",
    height: scaledPixels(100),
    gap: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scaledPixels(32),
    height: "100%",
  },
  text: {
    color: "white",
    fontSize: scaledPixels(24),
    fontWeight: "bold",
  },
  textActive: {
    marginTop: scaledPixels(5),
    borderBottomWidth: scaledPixels(5),
    borderColor: "red",
  },
  textView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradientBar: {
    ...StyleSheet.absoluteFillObject,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    opacity: 0.35,
    zIndex: 0,
  },
  highlightsContainer: {
    paddingBottom: scaledPixels(10),
  },
  highlightsTitle: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: scaledPixels(34),
    fontWeight: "bold",
    marginBottom: scaledPixels(20),
    marginTop: scaledPixels(15),
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scrollContent: {
    flex: 1,
    marginVertical: scaledPixels(48),
    paddingHorizontal: scaledPixels(50),
  },
});

export default MyLibrary;

const moviesData = [
  {
    id: "12727",
    title: "How language shapes the way we think",
    talker: "Lera Boroditsky",
    topic: "Language",
    description:
      "There are about 7,000 languages spoken around the world -- and they all have different sounds, vocabularies and structures. But do they shape the way we think? Cognitive scientist Lera Boroditsky shares examples of language -- from an Aboriginal community in Australia that uses cardinal directions instead of left and right to the multiple words for blue in Russian -- that suggest the answer is a resounding yes.",
    headerImage:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/7adc2250-de27-4116-b4ea-6fb4637ca98a/LeraBoroditsky_2017W-embed.jpg",
    movie:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/playlist.m3u8",
    duration: 853,
  },
  {
    id: "9987",
    title: "How to fix a broken heart",
    talker: "Guy Winch",
    topic: "Psychology",
    description:
      "At some point in our lives, almost every one of us will have our heart broken. Imagine how different things would be if we paid more attention to this unique emotional pain. Psychologist Guy Winch reveals how recovering from heartbreak starts with a determination to fight our instincts to idealize and search for answers that aren't there -- and offers a toolkit on how to, eventually, move on.",
    headerImage:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/20588915-d165-463f-aeb2-96994d240e13/GuyWinch_2017-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/30/63/007/products/2017-guy-winch-007-fallback-15b39b68458aede8008f3e52cc91a342-1200k.mp4",
    duration: 746,
  },
  {
    id: "1755",
    title: "How books can open your mind",
    talker: "Lisa Bu",
    topic: "Books",
    description:
      "What happens when a dream you've held since childhood ... doesn't come true? As Lisa Bu adjusted to a new life in the United States, she turned to books to expand her mind and create a new path for herself. She shares her unique approach to reading in this lovely, personal talk about the magic of books.",
    headerImage:
      "https://talkstar-photos.s3.amazonaws.com/uploads/3a42d13b-e7bc-4ffa-adeb-a07b2de9c960/LisaBu_2013-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/07/96/005/products/2013-lisa-bu-005-fallback-77dc8fb0a653890b84aab9649f598882-1200k.mp4",
    duration: 376,
  },
  {
    id: "66648",
    title: "How cities are detoxing transportation",
    talker: "Monica Araya",
    topic: "Cities",
    description:
      "People around the world are demanding clean air -- and cities are starting to respond, says electrification advocate Monica Araya. She takes us on a world tour of urban areas that are working to fully electrify their transportation systems over the next decade, shifting to emission-free motorcycles, cars, buses, ferries and beyond.",
    headerImage:
      "https://talkstar-photos.s3.amazonaws.com/uploads/c8434ffe-d033-4d05-8ffe-7c92d32b6ef0/MonicaAraya_2020T-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/36/54/003/products/2020t-monica-araya-003-fallback-975f61a5986f4c3367d3bba387391d03-1200k.mp4",
    duration: 612,
  },
  {
    id: "12727",
    title: "How language shapes the way we think",
    talker: "Lera Boroditsky",
    topic: "Language",
    description:
      "There are about 7,000 languages spoken around the world -- and they all have different sounds, vocabularies and structures. But do they shape the way we think? Cognitive scientist Lera Boroditsky shares examples of language -- from an Aboriginal community in Australia that uses cardinal directions instead of left and right to the multiple words for blue in Russian -- that suggest the answer is a resounding yes.",
    headerImage:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/7adc2250-de27-4116-b4ea-6fb4637ca98a/LeraBoroditsky_2017W-embed.jpg",
    movie:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/playlist.m3u8",
    duration: 853,
  },
  {
    id: "9987",
    title: "How to fix a broken heart",
    talker: "Guy Winch",
    topic: "Psychology",
    description:
      "At some point in our lives, almost every one of us will have our heart broken. Imagine how different things would be if we paid more attention to this unique emotional pain. Psychologist Guy Winch reveals how recovering from heartbreak starts with a determination to fight our instincts to idealize and search for answers that aren't there -- and offers a toolkit on how to, eventually, move on.",
    headerImage:
      "https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/20588915-d165-463f-aeb2-96994d240e13/GuyWinch_2017-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/30/63/007/products/2017-guy-winch-007-fallback-15b39b68458aede8008f3e52cc91a342-1200k.mp4",
    duration: 746,
  },
  {
    id: "1755",
    title: "How books can open your mind",
    talker: "Lisa Bu",
    topic: "Books",
    description:
      "What happens when a dream you've held since childhood ... doesn't come true? As Lisa Bu adjusted to a new life in the United States, she turned to books to expand her mind and create a new path for herself. She shares her unique approach to reading in this lovely, personal talk about the magic of books.",
    headerImage:
      "https://talkstar-photos.s3.amazonaws.com/uploads/3a42d13b-e7bc-4ffa-adeb-a07b2de9c960/LisaBu_2013-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/07/96/005/products/2013-lisa-bu-005-fallback-77dc8fb0a653890b84aab9649f598882-1200k.mp4",
    duration: 376,
  },
  {
    id: "66648",
    title: "How cities are detoxing transportation",
    talker: "Monica Araya",
    topic: "Cities",
    description:
      "People around the world are demanding clean air -- and cities are starting to respond, says electrification advocate Monica Araya. She takes us on a world tour of urban areas that are working to fully electrify their transportation systems over the next decade, shifting to emission-free motorcycles, cars, buses, ferries and beyond.",
    headerImage:
      "https://talkstar-photos.s3.amazonaws.com/uploads/c8434ffe-d033-4d05-8ffe-7c92d32b6ef0/MonicaAraya_2020T-embed.jpg",
    movie:
      "https://py.tedcdn.com/consus/projects/00/36/54/003/products/2020t-monica-araya-003-fallback-975f61a5986f4c3367d3bba387391d03-1200k.mp4",
    duration: 612,
  },
];
