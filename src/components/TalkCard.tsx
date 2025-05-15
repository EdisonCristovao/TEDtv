import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import { scaledPixels } from "../hooks/useScale";
import Typography from "./Typography";
export default function TalkCard({
  talk,
  onSelect,
  onFocus,
  isSquare = false,
}) {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <TouchableHighlight style={styles.container}>
          <>
            <View
              style={[
                styles.highlightThumbnail,
                isFocused && styles.highlightThumbnailFocused,
                isSquare ? { aspectRatio: 1 } : { aspectRatio: 16 / 9 },
              ]}
            >
              <Image
                source={{ uri: talk.headerImage }}
                style={[
                  styles.headerImage,
                  isSquare && styles.headerImagePodcast,
                ]}
              />
            </View>

            <Typography variant="body1" color="grey" fontWeight="bold">
              {talk.topic.toUpperCase()}
            </Typography>
            <Typography
              variant="h2"
              color="#fff"
              style={isSquare ? { maxWidth: scaledPixels(200) } : {}}
            >
              {talk.title}
            </Typography>
            <Typography variant="body1" color="grey">
              {talk.talker}
            </Typography>
          </>
        </TouchableHighlight>
      )}
    </SpatialNavigationFocusableView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: scaledPixels(6),
  },
  highlightThumbnail: {
    maxHeight: scaledPixels(240),
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
  headerImagePodcast: {
    aspectRatio: 1,
  },
  thumbnailTextContainer: {},
});
