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
  Alert
} from "react-native";
import CryptoES from "crypto-es";
 
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const testAPICall = () => {

      var http_method = 'post';                // Lower case.
      var url_path = '/v1/payments';    // Portion after the base URL.
      var salt = CryptoES.lib.WordArray.random(12);  // Randomly generated for each request.
      var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
                                              // Current Unix time.
      var access_key = '8E34CFD95D661EF7946E';     // The access key received from Rapyd.
      var secret_key = '5001ae0c57b14924dc361c69d2873c93246f9a22e26168ec514dfcaaa35e853bcd9c72c28dbca3c7';     // Never transmit the secret key by itself.

      var body = JSON.stringify({
        "amount": 1000,
        "currency": "USD",
        "payment_method": {
          "type": "in_amex_card",
          "fields": {
            "number": "4111111111111111",
            "expiration_month": "12",
            "expiration_year": "23",
            "name": "John Doe",
            "cvv": "345"
          },
          "metadata": {
            "merchant_defined": true
          }
        },
        "ewallets": [
          {
            "ewallet": "ewallet_8bf64b61b3133ff3076877c05d3d0d68",
            "percentage": 100
          }
        ],
        "capture": true
      });

      var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + body;

      var signature = CryptoES.enc.Hex.stringify(CryptoES.HmacSHA256(to_sign, secret_key));

      signature = CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(signature));
      var options = {
        'method': 'POST',
        'url': 'https://sandboxapi.rapyd.net/v1/payments',
        "body": body,
        'headers': {
          'Content-Type': 'application/json',
          'access_key': access_key,
          'salt': salt,
          'timestamp': timestamp,
          'signature': signature,
        }
      };


      fetch("https://sandboxapi.rapyd.net/v1/payments", options)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    }


 
  return (
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
 
      <Button 
      onPress={testAPICall}
      title="Login">
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
        
      </TouchableOpacity>
      </Button>
    </View>
  );
}
 
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
