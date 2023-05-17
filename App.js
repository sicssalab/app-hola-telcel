import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { Font, DefaultTheme, DarkTheme } from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import RouteApp from "./src/RouteApp";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import StoreProvider from "./src/context/StoreProvider";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [theme, setTheme] = useState(DarkTheme);

  const [fontsLoaded] = useFonts({
    [Font.GilroyBold]: require("./src/assets/fonts/Gilroy-Bold.ttf"),
    [Font.GilroyExtraBold]: require("./src/assets/fonts/Gilroy-ExtraBold.ttf"),
    [Font.GilroyLight]: require("./src/assets/fonts/Gilroy-Light.ttf"),
    [Font.GilroyMedium]: require("./src/assets/fonts/Gilroy-Medium.ttf"),
    [Font.GilroyRegular]: require("./src/assets/fonts/Gilroy-Regular.ttf"),
    [Font.GilroySemiBold]: require("./src/assets/fonts/Gilroy-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StoreProvider>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <View style={{flex: 1}} onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <NavigationContainer theme={theme}>
              <RouteApp />
            </NavigationContainer>
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </StoreProvider>
  );
}
