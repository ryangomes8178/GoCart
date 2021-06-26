import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeView from './pages/BarcodeView';
import SignInPage from './pages/SignInPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SignInPage1, SignIn2, SignIn } from "./pages/screens";


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
export default () => (
  <NavigationContainer>
    <Tabs.Navigator>
      <Tabs.Screen name="SignIn" component={SignInPage1} />
      <Tabs.Screen name="Camera" component={SignIn2} />
      <Tabs.Screen name="Cart" component={SignIn} />
    </Tabs.Navigator>
    
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
