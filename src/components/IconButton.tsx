import React from "react";
import {
  StyleSheet,
  PressableProps,
  ViewStyle,
  TouchableHighlight,
} from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";

interface CustomPressableProps extends PressableProps {
  name: string;
  onSelect: () => void;
  style?: ViewStyle;
}

const IconButton = ({
  name,
  onSelect,
  style,
  ...props
}: CustomPressableProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <TouchableHighlight
          {...props}
          style={[
            styles.watchButton,
            isFocused && styles.watchButtonFocused,
            style,
          ]}
        >
          <Icon name={name} size={30} color={isFocused ? "#000" : "#fff"} />
        </TouchableHighlight>
      )}
    </SpatialNavigationFocusableView>
  );
};

const styles = StyleSheet.create({
  watchButton: {
    borderRadius: scaledPixels(100),
    alignItems: "center",
    alignSelf: "flex-start",
    padding: scaledPixels(15),
  },
  watchButtonFocused: {
    backgroundColor: "#fff",
    padding: scaledPixels(15),
  },
});

export default IconButton;
