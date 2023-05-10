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
import TopHeader from "../components/TopHeader/TopHeader";
import ProfileUrbanView from "../views/ProfileUrbanView/ProfileUrbanView";
import useModalRadio from "../hooks/useModalRadio";
import { Audio } from "expo-av";

import { SvgUri } from 'react-native-svg';
import settings from '../settings';
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
              focused ? 
              // <EntertainmentIconActive /> 
              <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/home-active.${settings.typeImage}`}
                />
              :
              // <EntertainmentIcon fill={color} />
              <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/home.${settings.typeImage}`}
                  fill={"white"}
                />
          }}
          //component={EntertainmentView}
          component={RenderEntertainment}
        />
        <Tab.Screen
          name={SceneName.Avenues}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? 
              // <AvenuesIconActive /> 
              <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/location-active.${settings.typeImage}`}
                />
              : 
              // <AvenuesIcon fill={color} />
              <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/location.${settings.typeImage}`}
                  fill={"white"}
                />
          }}
          component={AvenuesView}
        />
        <Tab.Screen
          name={SceneName.Experience}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused 
              ? 
                // <ExperienceIconActive /> 
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/experience-active.${settings.typeImage}`}
                />
              : 
                // <ExperienceIcon fill={color} />
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/experience.${settings.typeImage}`}
                  fill={"white"}
                />
          }}
          component={ExperienceView}
        />
        <Tab.Screen
          name={SceneName.MagicTowns}
          options={{
            tabBarIcon: ({ focused, color }) =>
              focused ? (
                // <MagicTownsIconActive />
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/magictowns-active.${settings.typeImage}`}
                />
              ) : (
                // <MagicTownsIcon fill={color} />
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/magictowns.${settings.typeImage}`}
                  fill={"white"}
                />
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
                // <MenuProfileIconActive />
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/menu-active.${settings.typeImage}`}
                />
              ) : (
                // <MenuProfileIcon fill={color} />
                <SvgUri width={35} height={35}
                  uri={`${settings.domainImage}icons/menu/menu.${settings.typeImage}`}
                  fill={"white"}
                />
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
      //initialRouteName={SceneName.Entertainment}
      initialRouteName={SceneName.Home}
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
