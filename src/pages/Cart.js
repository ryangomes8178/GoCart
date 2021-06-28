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
import NumericInput from 'react-native-numeric-input'
import visa from '../../assets/mastercard.png';
import AsyncStorage from '@react-native-async-storage/async-storage'; 


const ScreenContainer = ({ children }) => (
    <View style = {styles.container_2}>{children}</View>
)


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

//create your forceUpdate hook
export const useForceUpdate = () => {
    //console.log("forceupdate!")
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export const Cart = ({ navigation }) => {

    //var cart_list = ["Strawberries", "Gilette Razor", "Lemon", "Pesto Sauce", "Tomato", "Tortillas - 30 ct", "Filler item", "Filler item", "Filler item", "Filler item"]
    var cart_list = []

    const [listData, setListData] = useState(  
      cart_list.map((_, i) => ({ key: `${i}`, text: cart_list[i] }))
    );

    const fetchAllItems = async () => {
      try {
          const keys = await AsyncStorage.getAllKeys()
          const items = await AsyncStorage.multiGet(keys)
          var cart_listData = [];

          var element;
          for (var i = 0; i < items.length; i++) {
            element = items[i];
            var itemDetails = JSON.parse(element[1])
            cart_listData.push({
              "key": i.toString(),
              "barcode": element[0],
              "text": itemDetails.name,
              "quantity": itemDetails.quantity,
              "price": itemDetails.price
            })
          }
          setListData(cart_listData);
      } catch (error) {
          console.log(error, "problemo")
      }
    }

    fetchAllItems();



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
      AsyncStorage.removeItem(listData[prevIndex].barcode)
      newData.splice(prevIndex, 1);
      console.log("newData size: " + newData.length )
      console.log("oldData size: " + listData.length )

      setListData(newData);

      console.log("newData size: " + newData.length )
      console.log("oldData size: " + listData.length )
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

              <View style={{flex: 0.9}}>
                <NumericInput 
                  
                  type='up-down'
                  onChange={value => console.log(value)}
                  value={data.item.quantity}
                />
              </View>


              <View style={{
                flex: 0.5,
                justifyContent: "center"
              }}>
                  <Text style={{fontWeight: "bold", fontSize: 25}}>{data.item.price * data.item.quantity}</Text>
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
                onPress={() => {console.log("edit card")}}>
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
                onPress={useForceUpdate()}>
                <Text style={{color: 'white', fontSize: 16}}>Checkout - <Text style={{fontWeight:"bold"}}>$39.51</Text></Text>
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
  