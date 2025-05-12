import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  ViewStyle,
} from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";

interface CustomPressableProps extends PressableProps {
  text?: string;
  onSelect: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const FocusablePressable = ({
  text,
  onSelect,
  style,
  children,
  ...props
}: CustomPressableProps) => {
  return (
    <SpatialNavigationFocusableView onSelect={onSelect}>
      {({ isFocused }) => (
        <Pressable
          {...props}
          style={[
            styles.watchButton,
            isFocused && styles.watchButtonFocused,
            style,
          ]}
          onPress={onSelect}
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
        </Pressable>
      )}
    </SpatialNavigationFocusableView>
  );
};

const styles = StyleSheet.create({
  watchButton: {
    paddingVertical: scaledPixels(15),
    borderRadius: scaledPixels(5),
    alignItems: "center",
    alignSelf: "flex-start",
    padding: scaledPixels(10),
  },
  watchButtonFocused: {
    borderColor: "#fff",
    borderWidth: 1,
    padding: scaledPixels(10),
  },
  watchButtonText: {
    color: "#fff",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
  },
  watchButtonTextFocused: {
    color: "#fff",
    fontSize: scaledPixels(18),
    fontWeight: "bold",
  },
});

export default FocusablePressable;
