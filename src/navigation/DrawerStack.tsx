import { useCallback } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  DrawerActions,
  NavigationContainerProps,
  NavigationContainerRefWithCurrent,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Directions, SpatialNavigationRoot } from "react-tv-space-navigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import HomeScreen from "../screens/HomeScreen";
import { useMenuContext } from "../contexts/MenuContext";
import CustomDrawerLayout from "../components/CustomDrawerLayout";
import DrawerContent from "../components/DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  const { isOpen: isMenuOpen, toggleMenu } = useMenuContext();
  const { navigationRef } = useRoute().params as {
    navigationRef: NavigationContainerRefWithCurrent<NavigationContainerProps>;
  };

  const onDirectionHandledWithoutMovement = useCallback(
    (movement: Directions) => {
      if (movement === "right") {
        navigationRef.current?.dispatch(DrawerActions.closeDrawer());
        toggleMenu(false);
      }
    },
    [toggleMenu, navigationRef]
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SpatialNavigationRoot
        isActive={isMenuOpen}
        onDirectionHandledWithoutMovement={onDirectionHandledWithoutMovement}
      >
        <Drawer.Navigator
          id={undefined}
          drawerContent={DrawerContent}
          layout={CustomDrawerLayout}
          defaultStatus="closed"
          screenOptions={{
            headerShown: false,
            drawerType: "front",
            overlayColor: "transparent",
            drawerStyle: {
              width: "100%",
              borderRightWidth: 0,
              backgroundColor: "transparent",
            },
          }}
        >
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        </Drawer.Navigator>
      </SpatialNavigationRoot>
    </GestureHandlerRootView>
  );
};

export default DrawerStack;
