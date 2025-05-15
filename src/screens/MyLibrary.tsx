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

import data from "../mock/talks.json";

const MyLibrary = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [focusedIndex, setFocusedIndex] = useState(0);

  const renderScrollableRow = useCallback(
    (title: string, data: any[], isSquare = false) => {
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
                gap: scaledPixels(50),
              }}
            >
              {data.map((item, index) => (
                <TalkCard
                  key={`${item.id}-${index}`}
                  talk={item}
                  onFocus={() => {
                    setFocusedIndex(index);
                  }}
                  isSquare={isSquare}
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
            {renderScrollableRow("Keep Watching", data.talks)}
            {renderScrollableRow("Keep Listening", data.podcasts, true)}
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
    height: scaledPixels(490),
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
