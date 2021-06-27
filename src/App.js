import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeView from './pages/BarcodeView';
import {SignInPageFunc} from './pages/SignInPage';
import {Cart} from './pages/Cart';
import {PreviousOrders} from './pages/PrevOrders';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SignInPage1, SignIn, SignIn1, SignInPage2 } from "./pages/screens";
import { isLoggedIn } from './pages/screens';



const AuthStack = createStackNavigator();
const AuthStack2 = createStackNavigator();
const Tabs = createBottomTabNavigator();


export default function App() {
  return (
  <NavigationContainer>
    <AuthStack.Navigator>
    {isLoggedIn ? (
          <>
                  <AuthStack.Screen name="SKRT" component={SignIn2} options={{headerShown: false}}/>

          </>
        ) : (
          <>
          <AuthStack.Screen name="SignIn" component={SignInPageFunc} options={{headerShown: false}}/>
          <AuthStack.Screen name="SKRT" component={SignIn2} options={{headerShown: false}}/>
          </>
        )}
   

      
      
    </AuthStack.Navigator>
    </NavigationContainer>


    
    
);
      }

export const SignIn2 = ({ navigation }) => {
  return (
    
    <Tabs.Navigator>
                       
                       <Tabs.Screen name="Previous Orders" component={PreviousOrders} />
                <Tabs.Screen name="Camera" component={SignIn} />
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
