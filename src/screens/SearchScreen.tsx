import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
} from "react-native";
import { MOCK_SEARCH_RESULTS } from "../mock/search";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import HeaderTitle from "../components/HeaderTitle";
import TedLogo from "../components/TedLogo";
import { scaledPixels } from "../hooks/useScale";
import { MaterialIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../navigation/types";
// Create a typed navigation hook
type NavigationProps = NavigationProp<RootStackParamList>;

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [focusedVideo, setFocusedVideo] = useState(null);
  const [focusedKey, setFocusedKey] = useState(null);
  const [searchText, setSearchText] = useState("");

  const filteredTalks = MOCK_SEARCH_RESULTS.filter((talk) =>
    talk.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Keyboard layout
  const keyboard = [
    ["A", "B", "C", "D", "E", "F"],
    ["G", "H", "I", "J", "K", "L"],
    ["M", "N", "O", "P", "Q", "R"],
    ["S", "T", "U", "V", "W", "X"],
    ["Y", "Z", "0", "1", "2", "3"],
    ["4", "5", "6", "7", "8", "9"],
    [
      { key: "SPACE", icon: "space-bar" }, // You can use MaterialIcons "space-bar"
      { key: "DELETE", icon: "backspace" }, // You can use MaterialIcons "backspace"
      { key: "CLEAR" },
    ],
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
        {row.map((keyObj) => {
          // Support both string and object keys
          const key =
            typeof keyObj === "string" ? keyObj : keyObj.key || keyObj;
          const icon =
            typeof keyObj === "object" && keyObj.icon ? keyObj.icon : null;

          return (
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
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                {icon ? (
                  <MaterialIcons
                    name={icon}
                    size={28}
                    color={focusedKey === key ? "#000" : "#fff"}
                  />
                ) : (
                  <Text
                    style={[
                      styles.keyText,
                      focusedKey === key && styles.focusedKeyText,
                    ]}
                  >
                    {key}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
          );
        })}
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
        <View>
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
        <TedLogo />
        <HeaderTitle title="Search" />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchText}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search for a title..."
            placeholderTextColor="#888"
            underlineColorAndroid="transparent"
            editable={false}
            focusable={false}
          />
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
            data={
              filteredTalks.length === 0
                ? []
                : [
                    ...filteredTalks,
                    ...Array((4 - (filteredTalks.length % 4)) % 4).fill(null),
                  ]
            }
            renderItem={({ item }) =>
              item ? renderVideoItem({ item }) : <View style={{ flex: 1 }} />
            }
            keyExtractor={(item, index) => (item ? item.id : `empty-${index}`)}
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
    paddingHorizontal: scaledPixels(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: scaledPixels(40),
    gap: 16,
  },
  logo: {
    color: "#FF0000",
    fontSize: scaledPixels(28),
    fontWeight: "bold",
    marginRight: scaledPixels(15),
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: scaledPixels(16),
    borderRadius: scaledPixels(8),
  },
  searchText: {
    color: "#FFFFFF",
    fontSize: scaledPixels(16),
  },
  keyboardArea: {},
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: scaledPixels(10),
  },
  key: {
    width: scaledPixels(40),
    height: scaledPixels(40),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: scaledPixels(5),
    marginRight: scaledPixels(10),
  },
  spaceKey: {
    width: scaledPixels(90),
  },
  keyText: {
    color: "#FFFFFF",
    fontSize: scaledPixels(16),
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
    marginBottom: scaledPixels(20),
    gap: scaledPixels(20),
  },
  videoContainer: {
    flex: 1,
  },
  videoImageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: scaledPixels(5),
    overflow: "hidden",
    marginBottom: scaledPixels(8),
  },
  focusedVideo: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: scaledPixels(5),
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  videoTitle: {
    color: "#FFFFFF",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
    marginBottom: scaledPixels(4),
  },
  videoSpeaker: {
    color: "#696969",
    fontSize: scaledPixels(14),
    fontWeight: "bold",
  },
});

export default SearchScreen;
