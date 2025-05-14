
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { scaledPixels } from "../hooks/useScale";
import { useDrawerStatus } from "@react-navigation/drawer";
import { DrawerLayout } from "react-native-gesture-handler";
import { ParamListBase } from "@react-navigation/native";
import { DrawerNavigationState } from "@react-navigation/native";
import { NavigationHelpers } from "@react-navigation/native";
import { DrawerDescriptor } from "@react-navigation/drawer/lib/typescript/src/types";
import Sidebar from "./Sidebar";
import DrawerContent from "./DrawerContent";

const CustomDrawerLayout = ({ children, ...rest }: {
  state: DrawerNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, {}>;
  descriptors: Record<string, DrawerDescriptor>;
  children: React.ReactNode;
}) => {

  return <View style={styles.container}>
    <Sidebar />
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