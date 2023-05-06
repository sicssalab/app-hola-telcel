import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { Dimensions } from 'react-native';
import { 
    createStackNavigator,
    CardStyleInterpolators,
    HeaderStyleInterpolators,
 } from '@react-navigation/stack';
import SceneName from '../constants/SceneName';
import { Text } from 'react-native';
import EntertainmentView from "../../views/EntertainmentView";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EntertainmentIconActive from "../../assets/icons/menu/home-active.svg";
import EntertainmentIcon from "../../assets/icons/menu/home.svg";
import NavbarTabHeader from '../../components/NavbarTabHeader/NavbarTabHeader';
// import {
//     CardStyleInterpolators,
//     createStackNavigator,
//     HeaderStyleInterpolators,
// } from '@react-navigation/stack';

//const Stack = createStackNavigator <RootStackParamList>();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const screenWidth = Dimensions.get('window').width;

const Home = () => {
    const themeContext = useContext(ThemeContext);
  
    return (
      <>
        {/* <TopHeader /> */}
        <Text>header con el radio</Text>
        <Tab.Navigator
          //tabBar={(props) => <Navbar {...props} />}
          tabBar={(props) => <NavbarTabHeader {...props} />}
          initialLayout={{ width: screenWidth }}
          screenOptions={{
            tabBarInactiveTintColor: themeContext.colors.text,
          }}
          initialRouteName={SceneName.Authentication}
          >
          <Tab.Screen
            name={SceneName.Entertainment}
            options={{
              tabBarIcon: ({ focused, color }) => focused 
                ? <EntertainmentIconActive />
                : <EntertainmentIcon fill={color} />
            }}
            component={EntertainmentView}
          />
        </Tab.Navigator>
      </>
    );
  };

const RouteApp = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            initialRouteName={SceneName.Entertainment}
            screenOptions={{
                headerShown: false,
                headerBackTitle: 'Volver',
                headerTitleAlign: 'center',
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
            {/* <Stack.Screen name={SceneName.Notifications} component={Notifications} />
            <Stack.Screen name={SceneName.Profile} component={Profile} />
            <Stack.Screen name={SceneName.Settings} component={Settings} /> */}
        </Stack.Navigator>
    );
}

export default RouteApp;