// import { useEvent } from "expo";
// import { useAudioPlayer, AudioModule } from "expo-audio";
// import { Animated, Dimensions, StyleSheet, View } from "react-native";
// import { DefaultFocus, SpatialNavigationView } from "react-tv-space-navigation";

// import SeekBar from "../components/SeekBar";
// import { useRoute, useNavigation } from "@react-navigation/native";
// import IconButton from "../components/IconButton";
// import { useEffect } from "react";

// // const bigBuckBunnySource: VideoSource =
// //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

// const { width } = Dimensions.get("window");

// export default function AudioScreen() {
//   const { params } = useRoute();
//   const { audioUrl, description, duration, id, publishedAt, title } = params as Episode;
//   const navigation = useNavigation();

//   const player = useAudioPlayer(audioUrl);

//   const { isPlaying } = useEvent(player, "playingChange", {
//     isPlaying: player.playing,
//   });

//   const { currentTime } = useEvent(player, "timeUpdate", {
//     currentTime: player.currentTime,
//     duration: player.duration,
//     playbackRate: player.playbackRate,
//   });

//   useEffect(() => {
//     if (player.isLoaded) {
//       player.play();
//     }
//   }, [player.isLoaded]);

//   return (
//     <View style={styles.contentContainer}>
//       <Animated.View style={styles.button}>
//         <IconButton onSelect={() => navigation.goBack()} name="arrow-left" />
//         <SpatialNavigationView
//           direction="horizontal"
//           style={{
//             justifyContent: "space-between",
//             width: "auto",
//             alignItems: "center",
//             gap: 10,
//           }}
//         >
//           <DefaultFocus>
//             <IconButton
//               onSelect={() => {
//                 if (isPlaying) {
//                   return player.pause();
//                 }

//                 return player.play();
//               }}
//               name={isPlaying ? "pause" : "play"}
//             />
//           </DefaultFocus>
//           <SeekBar currentTime={currentTime} duration={player.duration} />
//         </SpatialNavigationView>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//   },
//   button: {
//     ...StyleSheet.absoluteFillObject,
//     zIndex: 1,
//     width: "100%",
//     padding: 20,
//     justifyContent: "space-between",
//   },
//   buttonText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
//   video: {
//     width: width,
//     height: width * (9 / 16),
//   },
//   playPauseButton: {
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 10,
//     borderRadius: 5,
//   },
// });
