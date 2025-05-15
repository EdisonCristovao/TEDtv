import { Platform } from "react-native";

export const ROUTES = {
  Home: 'Home',
  Search: 'Search',
  Profile: 'Profile',
  Settings: 'Settings',
  Podcasts: 'Podcasts',
  MyLibrary: 'MyLibrary',
}

export const isIOS = Platform.OS === 'ios'; 