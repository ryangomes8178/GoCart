import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import { isLoggedIn } from './SignInPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

export const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image source={{uri: 'https://i.imgur.com/OvlkBz3.png'}}
                style={{width: 500, height: 100}} />
              <LottieView
                style = {styles.f1car}
                source = {require("../../assets/36204-3d-ferrari-f1.json")}
                autoPlay = {true}
                loop = {true}
                />
              <Text style={styles.name}>Welcome, Ron!</Text>
              <Text style={styles.userInfo}>ron.doe@gmail.com </Text>
              <Text style={styles.userInfo}>Berkeley, California </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
           
            <View style={styles.infoContent}>
              <Button color="#000000" title="Edit my Personal Info" onPress={() => {console.log("to-do")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#000000" title="Payment Methods" onPress={() => {navigation.navigate("Payment")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#000000" title="Previous Orders" onPress={() => {console.log("to-do")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#000000" title="Sign Out" onPress={() => {
                
                navigation.navigate("SignIn"); 
                AsyncStorage.clear();
              }}/>
            </View>
          </View>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:40,
    alignItems: 'center',
  },
  f1car: {
    width:200,
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    padding:0,
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    padding:20,
    backgroundColor: "#ADD8E6",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'center',
    padding:9
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end'
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});

                                            