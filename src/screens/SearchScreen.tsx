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
import { MOCK_SEARCH_RESULTS } from "../mock/search";
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const navigation = useNavigation();
  // State to track focused elements
  const [focusedVideo, setFocusedVideo] = useState(null);
  const [focusedKey, setFocusedKey] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Keyboard layout
  const keyboard = [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z", "0", "1", "2", "3"],
    ["4", "5", "6", "7", "8", "9"],
    ["SPACE", "DELETE", "CLEAR"],
  ];

  // Handle keyboard key press
  const handleKeyPress = (key) => {
    switch (key) {
      case "SPACE":
        setSearchText(searchText + " ");
        break;
      case "DELETE":
        setSearchText(searchText.slice(0, -1));
        break;
      case "CLEAR":
        setSearchText("");
        break;
      default:
        setSearchText(searchText + key);
        break;
    }
  };

  // Render a keyboard row
  const renderKeyboardRow = (row, rowIndex) => {
    return (
      <View key={`row-${rowIndex}`} style={styles.keyboardRow}>
        {row.map((key) => (
          <TouchableHighlight
            key={key}
            style={[
              styles.key,
              (key === "SPACE" || key === "DELETE" || key === "CLEAR") &&
                styles.spaceKey,
              focusedKey === key && styles.focusedKey,
            ]}
            onFocus={() => setFocusedKey(key)}
            onBlur={() => setFocusedKey(null)}
            onPress={() => handleKeyPress(key)}
            underlayColor="#FFFFFF"
            hasTVPreferredFocus={rowIndex === 0 && key === "A"}
          >
            <Text
              style={[
                styles.keyText,
                focusedKey === key && styles.focusedKeyText,
              ]}
            >
              {key}
            </Text>
          </TouchableHighlight>
        ))}
      </View>
    );
  };

  // Render a video item
  const renderVideoItem = ({ item }) => {
    const imageUrl = item.primaryImageSet[0].url;
    return (
      <TouchableHighlight
        onFocus={() => setFocusedVideo(item.id)}
        onBlur={() => setFocusedVideo(null)}
        underlayColor="transparent"
        style={styles.videoContainer}
        onPress={() => {
          navigation.navigate("Details", {
            movie:
              "https://py.tedcdn.com/consus/projects/00/30/63/007/products/2017-guy-winch-007-fallback-15b39b68458aede8008f3e52cc91a342-1200k.mp4",
            title: item.title,
            description: item.description,
            headerImage: imageUrl,
          });
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.videoImageContainer,
              focusedVideo === item.id && styles.focusedVideo,
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
          <Text style={styles.videoSpeaker}>{item.presenterDisplayName}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with TED logo and search bar */}
      <View style={styles.header}>
        <Text style={styles.logo}>TED</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>
            {searchText || "Search for a title..."}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>
        {/* Keyboard area */}
        <View style={styles.keyboardArea}>
          {keyboard.map((row, index) => renderKeyboardRow(row, index))}
        </View>

        {/* Videos grid */}
        <View style={{ flex: 1, gap: 10 }}>
          <FlatList
            data={MOCK_SEARCH_RESULTS}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 40,
    gap: 16,
  },
  logo: {
    color: "#FF0000",
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 15,
  },
  searchBar: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingVertical: 8,
  },
  searchText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  keyboardArea: {},
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  key: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    marginRight: 10,
  },
  spaceKey: {
    width: 90,
  },
  keyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  focusedKey: {
    backgroundColor: "#FFFFFF",
  },
  focusedKeyText: {
    color: "#000000",
  },
  videoGrid: {
    flex: 1,
  },
  videoRow: {
    justifyContent: "space-evenly",
    marginBottom: 20,
    gap: 20,
  },
  videoContainer: {
    flex: 1,
  },
  videoImageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 8,
  },
  focusedVideo: {
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  videoSpeaker: {
    color: "#696969",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default App;
