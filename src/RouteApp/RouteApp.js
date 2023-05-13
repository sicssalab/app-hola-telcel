import React, { useContext } from "react";
import { ThemeContext } from "styled-components/native";
import { Dimensions } from "react-native";
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import SceneName from "../constants/SceneName";
import { Text, View } from "react-native";
import EntertainmentView from "../views/EntertainmentView";
import AvenuesView from "../views/AvenuesView";
import StoryView from "../views/StoryView/StoryView";
import GroupUrbanView from "../views/GroupUrbanView";
import ExperienceView from "../views/ExperienceView";
import MagicTownsView from "../views/MagicTownsView";
import EditProfileView from "../views/EditProfileView";


import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavbarTabHeader from "../components/NavbarTabHeader/NavbarTabHeader";
import EntertainmentIconActive from "../assets/icons/menu/home-active.svg";
import EntertainmentIcon from "../assets/icons/menu/home.svg";
import AvenuesIconActive from "../assets/icons/menu/location-active.svg";
import AvenuesIcon from "../assets/icons/menu/location.svg";
import ExperienceIconActive from "../assets/icons/menu/experience-active.svg";
import ExperienceIcon from "../assets/icons/menu/experience.svg";
import MagicTownsIconActive from "../assets/icons/menu/magictowns-active.svg";
import MagicTownsIcon from "../assets/icons/menu/magictowns.svg";
import MenuProfileIconActive from "../assets/icons/menu/menu-active.svg";
import MenuProfileIcon from "../assets/icons/menu/menu.svg";
import TopHeader from "../components/TopHeader/TopHeader";
import ProfileUrbanView from "../views/ProfileUrbanView/ProfileUrbanView";
import useModalRadio from "../hooks/useModalRadio";
import { Audio } from "expo-av";
import LoginView from "../views/LoginView/LoginView";
import RegistrationView from "../views/RegistrationView";
// import {
//     CardStyleInterpolators,
//     createStackNavigator,
//     HeaderStyleInterpolators,
// } from '@react-navigation/stack';

//const Stack = createStackNavigator <RootStackParamList>();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get("window").width;

const Home = () => {
  const themeContext = useContext(ThemeContext);
  //TODO render al abrir para que no carge los videos iniciando
  const RenderMagicTowns = (props) => {
    return props.navigation.isFocused() ? <MagicTownsView /> : <></>
  }

  const RenderEntertainment = (props) => {
    return props.navigation.isFocused() ? <EntertainmentView /> : <></>
  }

  return (
    <>
      <TopHeader />
      <Tab.Navigator
        tabBar={(props) => <NavbarTabHeader {...props} />}
        initialLayout={{ width: screenWidth }}
        screenOptions={{
          tabBarInactiveTintColor: themeContext.colors.text,
        }}
        //initialRouteName={SceneName.Authentication}
        initialRouteName={SceneName.Entertainment}
      >
        <Tab.Screen
          name={SceneName.Entertainment}
          options={{
            mostrarok: true,
            tabBarIcon: ({ focused, color }) =>
              focused ? <EntertainmentIconActive /> :<EntertainmentIcon fill={color} />,
          }}
          //component={EntertainmentView}
          component={RenderEntertainment}
        />
        <Tab.Screen
          name={SceneName.Avenues}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? <AvenuesIconActive /> : <AvenuesIcon fill={color} />,
          }}
          component={AvenuesView}
        />
        <Tab.Screen
          name={SceneName.Experience}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? <ExperienceIconActive /> : <ExperienceIcon fill={color} />,
          }}
          component={ExperienceView}
        />
        <Tab.Screen
          name={SceneName.MagicTowns}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <MagicTownsIconActive />
              ) : (
                <MagicTownsIcon fill={color} />
              ),
          }}
          //component={MagicTownsView}
          //component={RenderTest}
          component={RenderMagicTowns}
        />
        <Tab.Screen
          name={SceneName.MenuProfile}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                <MenuProfileIconActive />
              ) : (
                <MenuProfileIcon fill={color} />
              ),
          }}
          component={EditProfileView}
        />
      </Tab.Navigator>
    </>
  );
};

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
      <Stack.Screen name={SceneName.Home} component={Home} />
      <Stack.Screen name={SceneName.ProfileScreen} component={ProfileUrbanView} />
      {/* <Stack.Screen name={SceneName.Notifications} component={Notifications} />
            <Stack.Screen name={SceneName.Settings} component={Settings} /> */}
      <Stack.Screen name={SceneName.Story} component={StoryView} />
      <Stack.Screen name={SceneName.GroupProfile} component={GroupUrbanView} />
    </Stack.Navigator>
  );
};

export default RouteApp;
