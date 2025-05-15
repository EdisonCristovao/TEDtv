import React from "react";
import { Text, StyleSheet } from "react-native";
import { scaledPixels } from "../hooks/useScale";

type TypographyVariant = "h1" | "h2" | "body1" | "body2" | "caption";

interface TypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  style?: object;
  color?: string;
  fontWeight?:
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  style,
  color = "#000000",
  fontWeight,
}) => {
  const getStyles = (): object => {
    switch (variant) {
      case "h1":
        return styles.h1;
      case "h2":
        return styles.h2;
      case "body1":
        return styles.body1;
      case "body2":
        return styles.body2;
      case "caption":
        return styles.caption;
      default:
        return styles.body1;
    }
  };

  return (
    <Text style={[getStyles(), { color }, fontWeight && { fontWeight }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: scaledPixels(32),
    fontWeight: "bold",
  },
  h2: {
    fontSize: scaledPixels(24),
    fontWeight: "600",
  },
  body1: {
    fontSize: scaledPixels(16),
  },
  body2: {
    fontSize: scaledPixels(14),
  },
  caption: {
    fontSize: scaledPixels(12),
    color: "#666666",
  },
});

export default Typography;
