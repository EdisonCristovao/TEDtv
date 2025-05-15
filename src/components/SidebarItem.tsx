import { View, StyleSheet, Text } from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import { scaledPixels } from "../hooks/useScale";

export default function SidebarItem({
  sidebarOpen,
  item,
  handleMenuItemSelect,
}: {
  sidebarOpen: boolean;
  item: any;
  handleMenuItemSelect: (item: any) => void;
}) {
  const { Icon } = item;

  const getIconStyle = (focused: boolean) => {
    return {
      ...styles.icon,
      ...(focused ? styles.focusedIcon : styles.notFocusedIcon),
    };
  };

  return (
    <SpatialNavigationFocusableView
      onSelect={() => handleMenuItemSelect(item)}
      style={styles.itemContainer}
    >
      {({ isFocused }) => (
        <View style={[styles.menuItems, getIconStyle(isFocused)]}>
          <Icon color={isFocused ? "white" : "#616161"} />
          {sidebarOpen && (
            <Text
              style={[styles.menuText, isFocused && styles.menuTextFocused]}
            >
              {item.label}
            </Text>
          )}
        </View>
      )}
    </SpatialNavigationFocusableView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {},
  icon: {
    borderRadius: scaledPixels(0),
    paddingLeft: scaledPixels(20),
    borderLeftWidth: scaledPixels(4),
  },
  focusedIcon: {
    borderLeftColor: "red",
  },
  notFocusedIcon: {
    borderLeftColor: "transparent",
  },
  menuItems: {
    flexDirection: "row",
    paddingTop: scaledPixels(16),
    paddingBottom: scaledPixels(8),
    gap: scaledPixels(40),
  },
  menuText: {
    color: "#616161",
    fontSize: scaledPixels(28),
  },
  menuTextFocused: {
    color: "white",
  },
});
