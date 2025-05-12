
import { StyleSheet, Text, View } from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { useDrawerStatus } from "@react-navigation/drawer";

const DrawerContent = () => {
  const status = useDrawerStatus();

  console.log(status);

  return <View style={styles.container}>
    <Text>Drawer content</Text>
  </View>;
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: scaledPixels(32),
  },
});