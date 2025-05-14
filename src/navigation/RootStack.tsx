import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import VideoScreen from "../screens/VideoScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SearchScreen from "../screens/SearchScreen";
import { View, StyleSheet } from "react-native";
import DrawerStack from "./DrawerStack";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  const navigationRef = useNavigationContainerRef();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        id={undefined}
        screenOptions={{
          headerShown: true,
          header: () => {
            return <View style={styles.header}></View>;
          },
        }}
      >
        <Stack.Screen name="DrawerStack" component={DrawerStack} initialParams={{ navigationRef }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "transparent",
    height: 100,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});
