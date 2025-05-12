import { useEvent } from "expo";
import { useVideoPlayer, VideoView, VideoSource } from "expo-video";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import FocusablePressable from "../components/FocusablePressable";
import { SpatialNavigationView } from "react-tv-space-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";

import SeekBar from "../components/SeekBar";
import { useRoute } from "@react-navigation/native";

const bigBuckBunnySource: VideoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const { width } = Dimensions.get("window");

export default function VideoScreen() {
  const route = useRoute();
  const { movie } = route.params;

  const player = useVideoPlayer(movie, (player) => {
    player.currentTime = 0;
    player.timeUpdateEventInterval = 1;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const { currentTime } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: player.currentLiveTimestamp,
    currentOffsetFromLive: player.currentOffsetFromLive,
    bufferedPosition: player.bufferedPosition,
  });

  return (
    <View style={styles.contentContainer}>
      <VideoView player={player} style={styles.video} nativeControls={false} />
      <Animated.View style={styles.button}>
        <FocusablePressable onSelect={() => {}}>
          <Icon name="arrow-left" size={20} color="white" />
        </FocusablePressable>
        <SpatialNavigationView
          direction="horizontal"
          style={{
            justifyContent: "space-between",
            width: "auto",
            alignItems: "center",
            gap: 10,
          }}
        >
          <FocusablePressable
            onSelect={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            <Icon name={isPlaying ? "pause" : "play"} size={20} color="white" />
          </FocusablePressable>

          <SeekBar currentTime={currentTime} duration={player.duration} />
        </SpatialNavigationView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  button: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  video: {
    width: width,
    height: width * (9 / 16),
  },
  playPauseButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 5,
  },
});
