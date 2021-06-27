import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {BarcodeView} from './pages/BarcodeView';
import {SignInPage} from './pages/SignInPage';
import {Cart} from './pages/Cart';
import {Profile} from './pages/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isLoggedIn } from './pages/SignInPage';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <AuthStack.Navigator>
      {isLoggedIn ? (
          <>
            <AuthStack.Screen name="SKRT" component={TabManager} options={{headerShown: false}}/>
          </>
        ) : (
          <>
            <AuthStack.Screen name="SignIn" component={SignInPage} options={{headerShown: false}}/>
            <AuthStack.Screen name="SKRT" component={TabManager} options={{headerShown: false}}/>
            
          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export const TabManager = ({ navigation }) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Profile" component={Profile} />
      <Tabs.Screen name="Camera" component={BarcodeView} />
      <Tabs.Screen name="Cart" component={Cart} />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
