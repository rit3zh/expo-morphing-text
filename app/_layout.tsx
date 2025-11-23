import {
  DARK_THEME_BACKGROUND,
  DEFAULT_STACK_SCREEN_OPTIONS,
} from "@/constants/react-native";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <React.Fragment>
      <ThemeProvider value={DARK_THEME_BACKGROUND}>
        <Stack {...DEFAULT_STACK_SCREEN_OPTIONS} />
      </ThemeProvider>
    </React.Fragment>
  );
}
