import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import { scaledPixels } from "../hooks/useScale";
import Typography from "./Typography";
export default function TalkCard({ talk, onSelect, onFocus }) {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect} onFocus={onFocus}>
      {({ isFocused }) => (
        <View style={styles.container}>
          <View
            style={[
              styles.highlightThumbnail,
              isFocused && styles.highlightThumbnailFocused,
            ]}
          >
            <Image
              source={{ uri: talk.headerImage }}
              style={styles.headerImage}
            />
          </View>

          <Typography variant="body1" color="grey" fontWeight="bold">
            {talk.topic.toUpperCase()}
          </Typography>
          <Typography variant="h2" color="#fff">
            {talk.title}
          </Typography>
          <Typography variant="body1" color="grey">
            {talk.talker}
          </Typography>
        </View>
      )}
    </SpatialNavigationFocusableView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaledPixels(400),
    gap: scaledPixels(6),
  },
  highlightThumbnail: {
    height: scaledPixels(240),
    marginBottom: scaledPixels(4),
  },
  highlightThumbnailFocused: {
    borderColor: "#fff",
    borderWidth: scaledPixels(4),
  },
  headerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  thumbnailTextContainer: {},
});
