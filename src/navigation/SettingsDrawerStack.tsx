import { createDrawerNavigator } from "@react-navigation/drawer";

import { StyleSheet, View } from "react-native";
import VideoResolution from "../screens/Settings/VideoResolution";
import DefaultHeader from "../components/DefaultHeader";
import { LinearGradient } from "expo-linear-gradient";
import SettingsDrawer from "../screens/Settings/SettingsDrawer/SettingsDrawer";

const Drawer = createDrawerNavigator();

const drawerItems = [
  {
    label: "Video Resolution",
    route: "VideoResolution",
  },
  {
    label: "Auto Play",
    route: "AutoPlay",
  },
  {
    label: "Languages",
    route: "Languages",
  },
  {
    label: "Your interests",
    route: "YourInterests",
  },
  {
    label: "Account",
    route: "Account",
  },
  {
    label: "Feedback",
    route: "Feedback",
  },
  {
    label: "About TED",
    route: "AboutTED",
  },
  {
    label: "Info",
    route: "Info",
  },
  {
    label: "Help",
    route: "Help",
  }
]

const DrawerStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black", paddingTop: 40 }}>
      <DefaultHeader title="Settings" />
      <Drawer.Navigator
        id={undefined}
        drawerContent={SettingsDrawer}
        defaultStatus="open"
        layout={({ children }) => <View style={{ flex: 1, backgroundColor: "transparent" }}>
          <LinearGradient
            colors={["#000000", "#1B1B1B", "transparent"]}
            locations={[0.025, 1]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
          {children}
        </View>}
        screenOptions={{
          headerShown: false,
          overlayColor: "transparent",
          drawerType: "permanent",
          drawerStyle: {
            backgroundColor: "transparent",
            borderRightWidth: 0,
          },
        }}
      >
        <Drawer.Screen name="VideoResolution" component={VideoResolution} />
      </Drawer.Navigator>
    </View>
  )
}

export default DrawerStack;