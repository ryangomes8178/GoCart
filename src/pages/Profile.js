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

export const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

              <Text style={styles.name}>Skrt Io </Text>
              <Text style={styles.userInfo}>skrt.io.bastards@mail.com </Text>
              <Text style={styles.userInfo}>Berkeley, California </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.item}>
           
            <View style={styles.infoContent}>
              <Button color="#ffffff" title="Edit my Personal Info" onPress={() => {console.log("to-do")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#ffffff" title="Payment Methods" onPress={() => {console.log("to-do")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#ffffff" title="Previous Orders" onPress={() => {console.log("to-do")}}/>
            </View>
          </View>

          <View style={styles.item}>
            
            <View style={styles.infoContent}>
              <Button color="#ffffff" title="Sign Out" onPress={() => {navigation.navigate("SignIn")}}/>
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
    padding:30,
    alignItems: 'center',
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
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
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

                                            