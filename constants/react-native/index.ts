import { DarkTheme } from "@react-navigation/native";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { Platform } from "react-native";

const isIOS = Platform.OS === "ios";

interface DefaultStackScreenOptions {
  screenOptions?: NativeStackNavigationOptions;
}

export const DARK_THEME_BACKGROUND = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0b0b0d",
  },
};

export const DEFAULT_STACK_SCREEN_OPTIONS: DefaultStackScreenOptions = {
  screenOptions: {
    ...(isIOS
      ? {
          headerShown: true,
          headerLargeTitle: true,
          headerTransparent: true,

          headerTitleStyle: {
            color: "#fff",
          },
        }
      : {
          headerShown: false,
        }),
  },
};
