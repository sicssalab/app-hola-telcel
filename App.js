import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-native-gesture-handler";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";
import { Font, DefaultTheme, DarkTheme } from "./src/theme";
import { NavigationContainer } from "@react-navigation/native";
import RouteApp from "./src/theme/RouteApp";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [theme, setTheme] = useState(DarkTheme);
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    [Font.GilroyBold]: require("./src/assets/fonts/Gilroy-Bold.ttf"),
    [Font.GilroyExtraBold]: require("./src/assets/fonts/Gilroy-ExtraBold.ttf"),
    [Font.GilroyLight]: require("./src/assets/fonts/Gilroy-Light.ttf"),
    [Font.GilroyMedium]: require("./src/assets/fonts/Gilroy-Medium.ttf"),
    [Font.GilroyRegular]: require("./src/assets/fonts/Gilroy-Regular.ttf"),
    [Font.GilroySemiBold]: require("./src/assets/fonts/Gilroy-SemiBold.ttf"),
  });
  // const theme = useMemo(() => {
  //   if (!colorScheme) return DefaultTheme;
  //   return colorScheme === 'dark' ? DarkTheme : DarkTheme;
  // }, [colorScheme]);
  // useEffect(() => {
  //   setTheme(DarkTheme);
  // }, [colorScheme]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <View style={{flex: 1}} onLayout={onLayoutRootView}>
          <StatusBar style="dark" />
          <NavigationContainer theme={theme}>
            <RouteApp />
          </NavigationContainer>
          <View style={styles.container}>
            <Text style={{ color: "red" }}>
              Open up App.js to start working on your app!
            </Text>
            <StatusBar style="auto" />
          </View>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
