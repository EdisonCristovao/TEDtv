import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text } from "react-native";
import RootStack from "./RootStack";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}
      id={undefined} drawerContent={DrawerContent}>
      <Drawer.Screen name="Root" component={RootStack} />
    </Drawer.Navigator>
  )
}

export default DrawerStack;
