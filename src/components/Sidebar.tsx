import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import SettingsIcon from "./svg/SettingsIcon";
import UserIcon from "./svg/UserIcon";
import SearchIcon from "./svg/SearchIcon";
import HomeIcon from "./svg/HomeIcon";
import MyLibraryIcon from "./svg/MyLibraryIcon";
import PodcastsIcon from "./svg/PodcastsIcon";
import {
  SpatialNavigationFocusableView,
  SpatialNavigationView,
} from "react-tv-space-navigation";
import FocusablePressable from "./FocusablePressable";
import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { scaledPixels } from "../hooks/useScale";

export default function Sidebar() {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();
  const [focused, setFocused] = useState("home");

  useEffect(() => {
    if (drawerStatus === "open") {
      navigation.dispatch(DrawerActions.closeDrawer());
    }
  }, [drawerStatus, navigation]);

  const handleFocus = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleBlur = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const getIconStyle = (focused: boolean) => {
    return {
      ...styles.icon,
      ...(focused ? styles.focusedIcon : styles.notFocusedIcon),
    };
  };

  return (
    <SpatialNavigationFocusableView
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={styles.container}
    >
      <View style={styles.header}>
        <FocusablePressable
          onFocus={() => {
            setFocused("user");
          }}
          style={styles.icon}
          focusedStyle={getIconStyle(focused === "user")}
          onSelect={() => {}}
        >
          <UserIcon color={focused === "user" ? "white" : "#616161"} />
        </FocusablePressable>
        <View style={styles.icons}>
          <FocusablePressable
            onFocus={() => {
              setFocused("search");
            }}
            style={styles.icon}
            focusedStyle={getIconStyle(focused === "search")}
            onSelect={() => {
              navigation.navigate("Search" as never);
            }}
          >
            <SearchIcon color={focused === "search" ? "white" : "#616161"} />
          </FocusablePressable>
          <FocusablePressable
            onFocus={() => {
              setFocused("home");
            }}
            style={styles.icon}
            focusedStyle={getIconStyle(focused === "home")}
            onSelect={() => {}}
          >
            <HomeIcon color={focused === "home" ? "white" : "#616161"} />
          </FocusablePressable>
          <FocusablePressable
            onFocus={() => {
              setFocused("myLibrary");
            }}
            style={styles.icon}
            focusedStyle={getIconStyle(focused === "myLibrary")}
            onSelect={() => {}}
          >
            <MyLibraryIcon
              color={focused === "myLibrary" ? "white" : "#616161"}
            />
          </FocusablePressable>
          <FocusablePressable
            onFocus={() => {
              setFocused("podcasts");
            }}
            style={styles.icon}
            focusedStyle={getIconStyle(focused === "podcasts")}
            onSelect={() => {}}
          >
            <PodcastsIcon
              color={focused === "podcasts" ? "white" : "#616161"}
            />
          </FocusablePressable>
        </View>
        <FocusablePressable
          onFocus={() => {
            setFocused("settings");
          }}
          style={styles.icon}
          focusedStyle={getIconStyle(focused === "settings")}
          onSelect={() => {}}
        >
          <SettingsIcon color={focused === "settings" ? "white" : "#616161"} />
        </FocusablePressable>
      </View>
    </SpatialNavigationFocusableView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: scaledPixels(32),
    backgroundColor: "black",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "transparent",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    paddingVertical: scaledPixels(50),
    paddingHorizontal: scaledPixels(20),
    marginRight: scaledPixels(42),
  },
  icons: {
    flexDirection: "column",
    alignItems: "center",
    gap: scaledPixels(40),
    marginBottom: scaledPixels(20),
  },
  icon: {
    borderRadius: scaledPixels(0),
    paddingLeft: scaledPixels(12),
    borderLeftWidth: scaledPixels(4),
  },
  focusedIcon: {
    borderLeftColor: "red",
  },
  notFocusedIcon: {
    borderLeftColor: "transparent",
  },
});
