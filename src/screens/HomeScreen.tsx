import { StyleSheet, FlatList, View, Image, Text } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  SpatialNavigationRoot,
  SpatialNavigationScrollView,
  SpatialNavigationView,
  Directions,
} from "react-tv-space-navigation";
import { LinearGradient } from "expo-linear-gradient";
import { scaledPixels } from "../hooks/useScale";
import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import TalkCard from "../components/TalkCard";
import { useMenuContext } from "../contexts/MenuContext";
import { NavigationProps } from "../navigation/types";
import FocusablePressable from "../components/FocusablePressable";
interface CardData {
  id: string;
  title: string;
  description: string;
  headerImage: string;
  movie: string;
}

export default function HomeScreen() {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigation = useNavigation<NavigationProps>();
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const isFocused = useIsFocused();

  const isActive = isFocused && !isMenuOpen;

  const focusedItem = useMemo(() => moviesData[focusedIndex], [focusedIndex]);

  const renderHeader = useCallback(
    () => (
      <View style={styles.header}>
        <View
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "flex-end",
            width: "60%",
            height: "100%",
          }}
        >
          <Image
            style={[
              styles.headerImage,
              { width: "100%", height: "100%", alignSelf: "flex-end" },
            ]}
            source={{
              uri: focusedItem.headerImage,
            }}
            resizeMode="none"
          />
        </View>
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.9)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.3)",
            "transparent",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientLeft}
        />
        <LinearGradient
          colors={["rgb(0,0,0)", "rgba(0,0,0, 0.3)", "transparent"]}
          locations={[0, 0.4, 1]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientBottom}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{focusedItem.title}</Text>
          <Text style={styles.headerDescription}>
            {focusedItem.description}
          </Text>
        </View>
      </View>
    ),
    [
      focusedItem.headerImage,
      focusedItem.title,
      focusedItem.description,
      styles.header,
      styles.gradientLeft,
      styles.gradientBottom,
    ]
  );

  const renderScrollableRow = useCallback(
    (title: string) => {
      return (
        <View style={styles.highlightsContainer}>
          <Text style={styles.highlightsTitle}>{title}</Text>
          <SpatialNavigationScrollView horizontal>
            <SpatialNavigationView
              direction="horizontal"
              style={{
                gap: scaledPixels(50),
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
    [styles, styles.headerImage, styles.thumbnailText]
  );

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Directions) => {
      if (movement === "left" && focusedIndex === 0) {
        navigation.dispatch(DrawerActions.openDrawer());
        toggleMenu(true);
      }
    },
    [toggleMenu, focusedIndex, navigation]
  );

  return (
    <SpatialNavigationRoot
      isActive={isActive}
      onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
    >
      <View style={styles.container}>
        {renderHeader()}
        <SpatialNavigationScrollView
          offsetFromStart={scaledPixels(60)}
          style={styles.scrollContent}
        >
          {renderScrollableRow("Trending Movies")}
          {renderScrollableRow("Classics")}
          {renderScrollableRow("Hip and Modern")}
        </SpatialNavigationScrollView>
      </View>
    </SpatialNavigationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollContent: {
    flex: 1,
    marginVertical: scaledPixels(48),
    paddingHorizontal: scaledPixels(20),
  },
  highlightsTitle: {
    color: "#fff",
    fontSize: scaledPixels(34),
    fontWeight: "bold",
    marginBottom: scaledPixels(20),
    marginTop: scaledPixels(15),
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: scaledPixels(48),
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  headerDescription: {
    color: "#fff",
    fontSize: scaledPixels(24),
    fontWeight: "500",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  thumbnailTextContainer: {
    position: "absolute",
    bottom: scaledPixels(10),
    left: scaledPixels(10),
    right: scaledPixels(10),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: scaledPixels(5),
    borderRadius: scaledPixels(3),
  },
  thumbnailText: {
    color: "#fff",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
    textAlign: "center",
  },
  highlightThumbnail: {
    width: scaledPixels(400),
    height: scaledPixels(240),
    marginRight: scaledPixels(10),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: scaledPixels(5),
  },
  highlightThumbnailFocused: {
    borderColor: "#fff",
    borderWidth: scaledPixels(4),
  },
  highlightsContainer: {
    padding: scaledPixels(10),
    height: scaledPixels(490),
  },
  thumbnailPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    height: "100%",
    borderRadius: scaledPixels(5),
  },
  header: {
    width: "100%",
    height: scaledPixels(400),
    position: "relative",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientLeft: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  gradientBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "15%",
  },
  headerTextContainer: {
    position: "absolute",
    left: scaledPixels(40), // Add left padding
    top: 0,
    bottom: 0,
    justifyContent: "center", // Center vertically
    width: "50%", // Limit width to prevent overlap with right side
    gap: scaledPixels(20),
  },
  highlightsList: {
    paddingLeft: scaledPixels(20),
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: scaledPixels(10),
    borderTopRightRadius: scaledPixels(10),
  },
  sidebar: {
    width: scaledPixels(200),
  },
});

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
      "https://py.tedcdn.com/consus/projects/00/30/63/007/products/2017-guy-winch-007-fallback-15b39b68458aede8008f3e52cc91a342-1200k.mp4",
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
