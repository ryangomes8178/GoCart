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
  TouchableHighlight
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import InputSpinner from "react-native-input-spinner";
import visa from '../../assets/mastercard.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoES from "crypto-es";
import { useFocusEffect } from '@react-navigation/native'; 


const ScreenContainer = ({ children }) => (
    <View style = {styles.container_2}>{children}</View>
)

var quantity_states = [];


const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    alert('Something went wrong reading your cart, please restart the app.');
  }
}

const fetchAllItems = async () => {
  try {
      console.log("fetchAllItems called")
      const keys = await AsyncStorage.getAllKeys()
      const items = await AsyncStorage.multiGet(keys)
      var cart_listData = [];
      var total = 0;

      var element;
      for (var i = 0; i < items.length; i++) {
        element = items[i];
        var itemDetails = JSON.parse(element[1])
        console.log(itemDetails)
        quantity_states[i][1](itemDetails.quantity)
        cart_listData.push({
          "key": i.toString(),
          "barcode": element[0],
          "text": itemDetails.name,
          "quantity": quantity_states[i][0],
          "price": itemDetails.price
        })
        total += quantity_states[i][0] * itemDetails.price; 
      }
      return [cart_listData, total];
  } catch (error) {
      console.log(error, "problemo")
  }
}

const updateQuantity = async (barcode, name, price, quantity) => {
  try {
    const jsonValue = {
      "name": name,
      "price": price,
      "quantity": quantity
    }
    await AsyncStorage.setItem(barcode, JSON.stringify(jsonValue))
  } catch (e) {
    // saving error
    alert('Something went wrong saving your cart, please try again!');
  }
}

export const Cart = ({ navigation }) => {

    const [totalState, setTotalState] = useState(0)
    const [listData, setListData] = useState([]);

    for (var i = 0; i < 20; i++) {
      var startingQuantity = 0;
      if (i < listData.length-1) {
        startingQuantity = listData[i].quantity;
      }
      quantity_states.push([]);
      [quantity_states[i][0], quantity_states[i][1]] = useState(1);
    }

    useFocusEffect(
      React.useCallback(() =>  {
        console.log("focused")
        async function updateList(){
          const [fetched_data, total] = await fetchAllItems();
          
          setListData(fetched_data);
          setTotalState(total)
        }
        updateList();
      }, [])
    );

  const handleCheckout = () => {

      var http_method = 'post';                // Lower case.
      var url_path = '/v1/payments';    // Portion after the base URL.
      var salt = CryptoES.lib.WordArray.random(12);  // Randomly generated for each request.
      var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
                                              // Current Unix time.
      var access_key = '8E34CFD95D661EF7946E';     // The access key received from Rapyd.
      var secret_key = '5001ae0c57b14924dc361c69d2873c93246f9a22e26168ec514dfcaaa35e853bcd9c72c28dbca3c7';     // Never transmit the secret key by itself.

      var body = JSON.stringify({
        "amount": totalState,
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

    navigation.navigate("Confirmation")
  }

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
      console.log(listData[prevIndex])

      console.log("old total ", totalState, "subtracting", listData[prevIndex].price * quantity_states[prevIndex][0])
      var newTotal = totalState - (listData[prevIndex].price * quantity_states[prevIndex][0])
      newTotal = Math.round(newTotal * 100) / 100
      setTotalState(newTotal)

      AsyncStorage.removeItem(listData[prevIndex].barcode)
      newData.splice(prevIndex, 1);

      setListData(newData);

  };

  const onRowDidOpen = rowKey => {
      console.log('This row opened', rowKey);
  };

  const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
          <View style={{flexDirection: "row", paddingLeft: 10}}>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{fontSize: 20}}>
                  {data.item.text}
                </Text>
              </View>

              <View style={{flex: 0.9, justifyContent:"center"}}>
                <InputSpinner
                  min={1}
                  step={1}
                  skin="paper"
                  style={{width: "80%"}}
                  colorMax={"#f04048"}
                  colorMin={"#40c5f4"}
                  editable={false}
                  fontSize={25}
                  value={quantity_states[data.item.key][0]}
                  onChange={(num) => {
                    quantity_states[data.item.key][1](num);
                    updateQuantity(data.item.barcode, data.item.text, data.item.price, num)
                  }}
                  onIncrease={(increased) => {
                    var newTotal = totalState + parseFloat(data.item.price)
                    newTotal = Math.round(newTotal * 100) / 100
                    setTotalState(newTotal)
                    console.log("new total " + newTotal)
                  }}
                  onDecrease={(decreased) => {
                    var newTotal = totalState - parseFloat(data.item.price)
                    newTotal = Math.round(newTotal * 100) / 100
                    setTotalState(newTotal)
                    console.log("new total " + newTotal)
                  }}
                />
              </View>


              <View style={{
                flex: 0.5,
                justifyContent: "center"
              }}>
                  <Text style={{fontWeight: "bold", fontSize: 20}}>{"$" + (Math.round(data.item.price * quantity_states[data.item.key][0] * 100)/100).toFixed(2)}</Text>
              </View>
          </View>
        </TouchableHighlight>
  );

  const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
          <Text>Left</Text>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnLeft]}
              onPress={() => closeRow(rowMap, data.item.key)}
          >
              <Text style={styles.backTextWhite}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.backRightBtn, styles.backRightBtnRight]}
              onPress={() => deleteRow(rowMap, data.item.key)}
          >
              <Text style={styles.backTextWhite}>Delete</Text>
          </TouchableOpacity>
      </View>
  );

    var getDoubleHeight = function(){
      return 2 * StatusBar.currentHeight;
    };

    return (
      <ScreenContainer>
          <View style={
            {
              flex: 10,
              paddingTop: 40
            }
          }>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end', flexDirection:"row"}}>

              <TouchableOpacity
                style={{
                  flex: 0.25,
                  height: "100%",
                  backgroundColor: '#338BA8',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {navigation.navigate("Payment")}}>
                  <Image source={visa} style={{ width: "40%", height: "40%"}} /> 
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 0.75,
                  height: "100%",
                  backgroundColor: '#1cb51c',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={handleCheckout}>
                <Text style={{color: 'white', fontSize: 16}}>Checkout - <Text style={{fontWeight:"bold"}}>{"$" + totalState.toFixed(2)}</Text></Text>
              </TouchableOpacity>

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
  
    container_2: {
      flex: 1,
      backgroundColor: "#fff"
    },
   
    backTextWhite: {
      color: '#FFF',
      fontSize: 20
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 100,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'black',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    }
  });
  