import { useEffect, useMemo, useState } from 'react';
import 'react-native-gesture-handler';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import { DefaultTheme, DarkTheme } from './src/theme';
import { NavigationContainer } from '@react-navigation/native';
import RouteApp from './src/theme/RouteApp';
export default function App() {
  const [theme, setTheme] = useState();
  const colorScheme = useColorScheme();

  // const theme = useMemo(() => {
  //   if (!colorScheme) return DefaultTheme;
  //   return colorScheme === 'dark' ? DarkTheme : DarkTheme;
  // }, [colorScheme]);

  useEffect(() => {
    setTheme(DarkTheme)
  }, [colorScheme])

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style='dark' />
        <NavigationContainer theme={theme}>
          <RouteApp />
        </NavigationContainer>
        <View style={styles.container}>
          <Text style={{ color: "red" }}>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
