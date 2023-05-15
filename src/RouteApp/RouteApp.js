import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import SceneName from "../constants/SceneName";
import { Text, View } from "react-native";
import StoryView from "../views/StoryView/StoryView";
import GroupUrbanView from "../views/GroupUrbanView";

import ProfileUrbanView from "../views/ProfileUrbanView/ProfileUrbanView";
import useModalRadio from "../hooks/useModalRadio";
import { Audio } from "expo-av";
import LoginView from "../views/LoginView/LoginView";
import RegistrationView from "../views/RegistrationView";
import HomeView from "../views/HomeView/HomeView";
import SettingView from "../views/SettingView/SettingView";
import MallView from "../views/MallView";

const Stack = createStackNavigator();
const RouteApp = () => {
  const theme = useContext(ThemeContext);
  const sound = React.useRef(new Audio.Sound());
  useModalRadio(sound);

  return (
    <Stack.Navigator
      initialRouteName={SceneName.Home}
      //initialRouteName={SceneName.Authentication}
      screenOptions={{
        headerShown: false,
        headerBackTitle: "Volver",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.headerBackground,
        },
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.text,
        },
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
      }}
    >

      <Stack.Screen name={SceneName.Authentication} component={LoginView} />
      <Stack.Screen name={SceneName.Registration} component={RegistrationView} />
      <Stack.Screen name={SceneName.Home} component={HomeView} />
      <Stack.Screen name={SceneName.Setting} component={SettingView} />
      <Stack.Screen name={SceneName.ProfileScreen} component={ProfileUrbanView} />
      <Stack.Screen name={SceneName.Malls} component={MallView} />
      {/* <Stack.Screen name={SceneName.Notifications} component={Notifications} />
            <Stack.Screen name={SceneName.Settings} component={Settings} /> */}
      <Stack.Screen name={SceneName.Story} component={StoryView} />
      <Stack.Screen name={SceneName.GroupProfile} component={GroupUrbanView} />
    </Stack.Navigator>
  );
};

export default RouteApp;
