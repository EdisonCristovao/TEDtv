import React, { useEffect, useCallback } from "react";
import RemoteControlManager from "./RemoteControlManager";
import { SupportedKeys } from "./SupportedKeys";
import { useNavigation } from "@react-navigation/native";

export const GoBackConfiguration: React.FC = () => {
  const navigation = useNavigation();
  const { isOpen: isMenuOpen } = { isOpen: false };

  const handleBackPress = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation, isMenuOpen]);

  useEffect(() => {
    const remoteControlListener = (pressedKey: SupportedKeys) => {
      if (pressedKey === SupportedKeys.Back) {
        handleBackPress();
      }
    };

    RemoteControlManager.addKeydownListener(remoteControlListener);
    return () =>
      RemoteControlManager.removeKeydownListener(remoteControlListener);
  }, [handleBackPress]);

  return null;
};
