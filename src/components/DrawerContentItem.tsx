import { View, StyleSheet, Text } from "react-native";
import { SpatialNavigationFocusableView } from "react-tv-space-navigation";
import { scaledPixels } from "../hooks/useScale";
import { DrawerItem } from "@react-navigation/drawer";
import { useMenuContext } from "../contexts/MenuContext";

export default function DrawerContentItem({ item, handleMenuItemSelect }: { item: any, handleMenuItemSelect: (item: any) => void }) {
  const { Icon } = item;
  const { isOpen: isMenuOpen } = useMenuContext();

  const getIconStyle = (focused: boolean) => {
    return { ...styles.icon, ...(focused ? styles.focusedIcon : styles.notFocusedIcon) };
  }

  return (
    <SpatialNavigationFocusableView onSelect={() => handleMenuItemSelect(item)}>
      {({ isFocused }) => {
        return (
          <View style={[styles.menuItems, getIconStyle(isFocused)]}>
            {isMenuOpen && <Text style={[styles.menuText, isFocused && styles.menuTextFocused]}>{item.label}</Text>}
          </View>
        )
      }}
    </SpatialNavigationFocusableView>
  )
}

const styles = StyleSheet.create({
  menuItems: {
    flexDirection: 'row',
    paddingTop: scaledPixels(16),

    gap: scaledPixels(34),
  },
  menuText: {
    color: "#616161",
    fontSize: scaledPixels(32),
  },
  menuTextFocused: {
    color: 'white',
  },
});
