import { NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Details: {
    movie: string;
    title: string;
    description: string;
    headerImage: string;
  };
  // Add other screens as needed
};

export type NavigationProps = NavigationProp<RootStackParamList>;
