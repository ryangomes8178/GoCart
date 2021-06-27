import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import BarcodeView from './BarcodeView';
import SignInPage from './SignInPage';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 


const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
)




export var isLoggedIn = false;

export const SignIn = ({ navigation }) => {
  return (
    <BarcodeView>
        
    </BarcodeView>
  );
};

export const Cart = ({ navigation }) => {
    return (
      <Text> Cart </Text>
    );
  };
export const SignIn2 = ({ navigation }) => {
  return (
    <NavigationContainer>
    <Tabs.Navigator>
              
                <Tabs.Screen name="Camera" component={SignIn} />
                <Tabs.Screen name="Cart" component={Cart} />
            </Tabs.Navigator>
            </NavigationContainer>
  );
    

}

const styles2 = StyleSheet.create({
    container: {
        flex: 1,
    },
    toptext: {
        alignItems: "center",
        top: 30,

    },
});

export const SignInPage1 = ({ navigation }) => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    
    <ScreenContainer>
        <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/log2.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
 
      <Button title="Login" onPress={() => {isLoggedin = true;}}/>
      
      
    </View>
    </ScreenContainer>
  );
  };

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 30,
    width: "75%",
    height: "30%",
  },

  button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
  },
  
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    alignItems: "center",
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
