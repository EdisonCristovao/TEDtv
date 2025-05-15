import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
  TouchableHighlight,
} from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";

interface CustomPressableProps extends PressableProps {
  text?: string;
  onSelect: () => void;
  style?: ViewStyle;
  focusedStyle?: ViewStyle;
  children?: React.ReactNode;
}

const FocusablePressable = ({
  text,
  onSelect,
  style,
  focusedStyle,
  children,
  ...props
}: CustomPressableProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <TouchableHighlight
          {...props}
          style={[
            styles.watchButton,
            isFocused && (focusedStyle || styles.watchButtonFocused),
            style,
          ]}
        >
          {children ? (
            children
          ) : (
            <Text
              style={[
                isFocused
                  ? styles.watchButtonTextFocused
                  : styles.watchButtonText,
              ]}
            >
              {text}
            </Text>
          )}
        </TouchableHighlight>
      )}
    </SpatialNavigationFocusableView>
  );
};

const styles = StyleSheet.create({
  watchButton: {
    paddingVertical: scaledPixels(15),
    paddingHorizontal: scaledPixels(30),
    borderRadius: scaledPixels(5),
    alignItems: "center",
    alignSelf: "flex-start",
    padding: scaledPixels(10),
    backgroundColor: "#202020",
    color: "#615F5F",
  },
  watchButtonFocused: {
    padding: scaledPixels(10),
    backgroundColor: "#FFFFFF",
  },
  watchButtonText: {
    color: "#fff",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
  },
  watchButtonTextFocused: {
    color: "#111",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
  },
});

export default FocusablePressable;
