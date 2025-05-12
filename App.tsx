import { StyleSheet, Text, View } from "react-native";
import {
  Directions,
  SpatialNavigation,
  SpatialNavigationRoot,
} from "react-tv-space-navigation";
import RemoteControlManager from "./app/remote-control/RemoteControlManager";
import { SupportedKeys } from "./app/remote-control/SupportedKeys";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./App";
import VideoScreen from "./app/video";

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping: { [key in SupportedKeys]: Directions | null } = {
      [SupportedKeys.Right]: Directions.RIGHT,
      [SupportedKeys.Left]: Directions.LEFT,
      [SupportedKeys.Up]: Directions.UP,
      [SupportedKeys.Down]: Directions.DOWN,
      [SupportedKeys.Enter]: Directions.ENTER,
      [SupportedKeys.Back]: null,
    };

    const remoteControlListener = (keyEvent: SupportedKeys) => {
      callback(mapping[keyEvent]);
    };

    return RemoteControlManager.addKeydownListener(remoteControlListener);
  },

  remoteControlUnsubscriber: (remoteControlListener) => {
    RemoteControlManager.removeKeydownListener(remoteControlListener);
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    Video: VideoScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <NavigationContainer>
      <SpatialNavigationRoot>
        <Navigation />
      </SpatialNavigationRoot>
    </NavigationContainer>
  );
}
