import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { scaledPixels } from "../../hooks/useScale";
import BaseSettingsScreen from "./BaseSettingsScreen";

const VideoResolution = () => {
  // State to track focused elements
  const [focusedPodcast, setFocusedPodcast] = useState(null);

  return (
    <BaseSettingsScreen >
      {/* Header with TED logo and search bar */}
      <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>

      </View>
    </BaseSettingsScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 40,
    gap: 16,
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

export default VideoResolution;
