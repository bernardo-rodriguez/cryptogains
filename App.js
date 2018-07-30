import React from 'react';
import { Text } from 'react-native'
import firebase from 'react-native-firebase';
import Login from './app/pages/Login'
import AuthLoadingScreen from './app/pages/AuthLoadingScreen'
import Main from './app/pages/Main'
import Icon from 'react-native-vector-icons/FontAwesome'
import { createSwitchNavigator, createStackNavigator, 
         createBottomTabNavigator } from 'react-navigation';

const AuthStack = createStackNavigator({ login: Login });
const routeToIcon = {
  "Dashboard": "pie-chart",
  "Market": "line-chart",
  "Exchange": "exchange",
  "News": "newspaper-o",
  "Orders": "ticket",
}

const AppStack = createBottomTabNavigator({
  Market: Main,
  Exchange: Main,
  Dashboard: Main,
  News: Main,
  Orders: Main,
},{
  initialRouteName: "Dashboard",
  swipeEnabled: true,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      console.log(focused, tintColor)
      const iconName = routeToIcon[navigation.state.routeName]
      return <Icon name={iconName} size={25} color={focused ? tintColor: "grey"} />
    }})
})

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);