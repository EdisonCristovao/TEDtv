import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Animated,
} from "react-native";
import SettingsIcon from "./svg/SettingsIcon";
import UserIcon from "./svg/UserIcon";
import SearchIcon from "./svg/SearchIcon";
import HomeIcon from "./svg/HomeIcon";
import MyLibraryIcon from "./svg/MyLibraryIcon";
import PodcastsIcon from "./svg/PodcastsIcon";
import { DefaultFocus, SpatialNavigationRoot } from "react-tv-space-navigation";
import { useEffect, useRef } from "react";
import { scaledPixels } from "../hooks/useScale";
import { useMenuContext } from "../contexts/MenuContext";
import { ROUTES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import SidebarItem from "./SidebarItem";

const COLLAPSED_WIDTH = 90;
const EXPANDED_WIDTH = 252;

export const drawerItems = [
  {
    Icon: ({ color }: { color: string }) => <UserIcon color={color} />,
    route: ROUTES.Profile,
    label: "Profile",
  },
  {
    Icon: ({ color }: { color: string }) => <SearchIcon color={color} />,
    route: ROUTES.Search,
    label: "Search",
  },
  {
    Icon: ({ color }: { color: string }) => <HomeIcon color={color} />,
    route: ROUTES.Home,
    label: "Home",
  },
  {
    Icon: ({ color }: { color: string }) => <MyLibraryIcon color={color} />,
    route: ROUTES.MyLibrary,
    label: "My Library",
  },
  {
    Icon: ({ color }: { color: string }) => <PodcastsIcon color={color} />,
    route: ROUTES.Podcasts,
    label: "Podcasts",
  },
  {
    Icon: ({ color }: { color: string }) => <SettingsIcon color={color} />,
    route: ROUTES.Settings,
    label: "Settings",
  },
];

export default function Sidebar({ onSelect }: { onSelect: () => void }) {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const widthAnim = useRef(new Animated.Value(COLLAPSED_WIDTH)).current;
  const navigation = useNavigation();

  const handleMenuItemSelect = (item: { route: string; label: string }) => {
    toggleMenu(false);
    navigation.navigate(item.route as never);
  };

  useEffect(() => {
    const toggleDrawer = () => {
      Animated.timing(widthAnim, {
        toValue: isMenuOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        duration: 0,
        useNativeDriver: false,
      }).start();
    };

    toggleDrawer();
    onSelect();
  }, [isMenuOpen]);

  return (
    <SpatialNavigationRoot isActive={isMenuOpen}>
      <Animated.View style={[styles.container, { width: widthAnim }]}>
        <SidebarItem
          sidebarOpen={isMenuOpen}
          item={drawerItems[0]}
          handleMenuItemSelect={handleMenuItemSelect}
        />
        <View style={styles.menuItemsContainer}>
          <SidebarItem
            sidebarOpen={isMenuOpen}
            item={drawerItems[1]}
            handleMenuItemSelect={handleMenuItemSelect}
          />
          <DefaultFocus>
            <SidebarItem
              sidebarOpen={isMenuOpen}
              item={drawerItems[2]}
              handleMenuItemSelect={handleMenuItemSelect}
            />
          </DefaultFocus>
          <SidebarItem
            sidebarOpen={isMenuOpen}
            item={drawerItems[3]}
            handleMenuItemSelect={handleMenuItemSelect}
          />
          <SidebarItem
            sidebarOpen={isMenuOpen}
            item={drawerItems[4]}
            handleMenuItemSelect={handleMenuItemSelect}
          />
        </View>
        <SidebarItem
          sidebarOpen={isMenuOpen}
          item={drawerItems[5]}
          handleMenuItemSelect={handleMenuItemSelect}
        />
      </Animated.View>
    </SpatialNavigationRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: scaledPixels(50),
    paddingLeft: scaledPixels(20),
  },
  menuItemsContainer: {
    flexDirection: "column",
    gap: scaledPixels(32),
  },
});
