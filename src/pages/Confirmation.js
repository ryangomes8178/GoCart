import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import './Cart.js'
import LottieView from 'lottie-react-native';


import QRCode from 'react-native-qrcode-svg';

// Simple usage, defaults for all but the value

export const Confirmation = ({ navigation }) => {
    console.log(global.orderid)
    return (
      <View style={styles.container}>

      <Text style={styles.success}>Your order was placed successfully!</Text>
      <Text style={styles.confnumber}>Order Number - {global.orderid}</Text>
      <Text style={styles.msg}>Show this code on your way out!</Text>
      <QRCode
        value = {global.orderid}
        size={250}
      />
      <LottieView
        style = {styles.scanAni}
        source = {require("../../assets/62699-qr-code-scanner.json")}
        autoPlay = {true}
        loop = {false}
      />
      </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  success: {
    fontSize : 18,
    fontWeight: "bold",
    paddingBottom: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  msg: {
    fontSize : 15,
    fontWeight: "bold",
    paddingBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  confnumber: {
    paddingTop: 3,
    paddingBottom: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  check: {
    width:200,
    height:200,
    justifyContent: 'center',
  },
  scanAni: {
    width: 300,
    height: 300,
    paddingLeft: 5,
    justifyContent: 'flex-end'
  }
});
