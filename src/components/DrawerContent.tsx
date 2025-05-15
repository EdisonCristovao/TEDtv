
import { StyleSheet, Text, View } from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { LinearGradient } from "expo-linear-gradient";

const DrawerContent = () => {
  return <View style={styles.container}>
    <LinearGradient
      colors={["#000000", "transparent"]}
      locations={[0.025, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    />
  </View>;
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: scaledPixels(50),
    paddingRight: scaledPixels(20),
  },
  menuItemsContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: scaledPixels(50),
    paddingTop: scaledPixels(0),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  }
});