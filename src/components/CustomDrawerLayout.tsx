
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { DrawerNavigationState } from "@react-navigation/native";
import { NavigationHelpers } from "@react-navigation/native";
import { DrawerDescriptor } from "@react-navigation/drawer/lib/typescript/src/types";
import Sidebar from "./Sidebar";

const CustomDrawerLayout = ({ children, navigation }: {
  state: DrawerNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, {}>;
  descriptors: Record<string, DrawerDescriptor>;
  children: React.ReactNode;
}) => {

  const onSelectSidebarMenu = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }

  return <View style={styles.container}>
    <Sidebar onSelect={onSelectSidebarMenu} />
    {children}
  </View>;
};

export default CustomDrawerLayout;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingLeft: scaledPixels(32),
  },
});