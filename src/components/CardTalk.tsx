import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import { scaledPixels } from "../hooks/useScale";
import Typography from "./Typography";
export default function CardTalk({ talk, onSelect }) {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
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

          <Typography variant="h2" color="#fff">
            {talk.title}
          </Typography>
          <Typography variant="body1" color="grey">
            Edison Cristovao
          </Typography>
        </View>
      )}
    </SpatialNavigationFocusableView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scaledPixels(400),
    gap: scaledPixels(8),
  },
  highlightThumbnail: {
    height: scaledPixels(240),
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
