/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import {Icon} from 'react-native-elements';
import Colors from './src/color';


import Login from './src/Login';
import LoginOtp from './src/LoginOtp';
import SignUp from './src/SignUp';
import Home from './src/Home';

const AuthStack = new createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      title: 'Sign In',
      headerTitleStyle: {
        color: Colors.grey,
      },
      headerLeft: <Icon iconStyle={{padding:10}} type='ionicon' name='ios-arrow-back' color={Colors.themeColor} /> 
    })
  },
  LoginOtp: {
    screen: LoginOtp
  },
  SignUp: {
    screen: SignUp
  }
});

const AppSwitch = new createSwitchNavigator({
  Auth: AuthStack,
  Home: Home,
});

export default createAppContainer(AppSwitch);
