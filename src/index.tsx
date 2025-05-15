import {
  Directions,
  SpatialNavigation,
  SpatialNavigationRoot,
} from "react-tv-space-navigation";
import RemoteControlManager from "./remote-control/RemoteControlManager";
import { SupportedKeys } from "./remote-control/SupportedKeys";

import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./navigation/RootStack";
import { MenuProvider } from "./contexts/MenuContext";

SpatialNavigation.configureRemoteControl({
  remoteControlSubscriber: (callback) => {
    const mapping: { [key in SupportedKeys]: Directions | null } = {
      [SupportedKeys.Right]: Directions.RIGHT,
      [SupportedKeys.Left]: Directions.LEFT,
      [SupportedKeys.Up]: Directions.UP,
      [SupportedKeys.Down]: Directions.DOWN,
      [SupportedKeys.Enter]: Directions.ENTER,
      [SupportedKeys.Back]: null,
      [SupportedKeys.PlayPause]: null,
      [SupportedKeys.FastForward]: null,
      [SupportedKeys.Rewind]: null,
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

export default function App() {
  return (
    <MenuProvider>
      <SpatialNavigationRoot>
        <RootStack />
      </SpatialNavigationRoot>
    </MenuProvider>
  );
}
