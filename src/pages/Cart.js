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


const ScreenContainer = ({ children }) => (
    <View style = {styles.container_2}>{children}</View>
)

global.totalUpdated = true;
global.total = 0
global.renderCount = 0;
global.numCartItems = 0;


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

var benjamin = 0

//create your forceUpdate hook
export const useForceUpdate = () => {
    //console.log("forceupdate!")
    if (true) {
      console.log("rendering.......")
      const [value, setValue] = useState(0); // integer state
      benjamin++
      return () => setValue(value => value + 1); // update the state to force render
    } else {
      return null
    }
}


export const Cart = ({ navigation }) => {

    //var cart_list = ["Strawberries", "Gilette Razor", "Lemon", "Pesto Sauce", "Tomato", "Tortillas - 30 ct", "Filler item", "Filler item", "Filler item", "Filler item"]
    var cart_list = []
    var quantity_states = [];
    const [totalState, setTotalState] = useState(0)

    const [listData, setListData] = useState(  
      cart_list.map((_, i) => ({ key: `${i}`, text: cart_list[i] }))
    );

    function updateGlobalTotal() {
      console.log("updateGlobalTotal total " + listData.length)
      // var total = 0;
      // if (global.total != 0 && listData.length != global.numCartItems) {
      //   total += global.total
      // }
      console.log("updateGlobalTotal total returns a total of " + global.total)

      // for (var i = 0; i < listData.length; i++) {
      //   total += quantity_states[i][0] * listData[i].price
      // }

      global.total = Math.round(global.total*100)/100
      setTotalState(global.total)
    }

    function updateLocalTotal(total) {
      setTotalState(total);
    }

    for (var i = 0; i < 20; i++) {
      var startingQuantity = 0;
      if (i < listData.length-1) {
        startingQuantity = listData[i].quantity;
      }
      quantity_states.push([]);
      [quantity_states[i][0], quantity_states[i][1]] = useState(1);
    }

    const fetchAllItems = async () => {
      try {
          const keys = await AsyncStorage.getAllKeys()
          const items = await AsyncStorage.multiGet(keys)
          var cart_listData = [];
          var total = 0;

          var element;
          for (var i = 0; i < items.length; i++) {
            element = items[i];
            var itemDetails = JSON.parse(element[1])
            cart_listData.push({
              "key": i.toString(),
              "barcode": element[0],
              "text": itemDetails.name,
              "quantity": quantity_states[i][0],
              "price": itemDetails.price
            })
            total += quantity_states[i][0] * itemDetails.price; 
          }
          if (global.renderCount < 5) {
            updateGlobalTotal()
            // console.log("illawarra - " + global.total)
            // setTotalState(global.total)
            global.renderCount += 1
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

      global.total -= (listData[prevIndex].price * quantity_states[prevIndex][0])
      global.total = Math.round(global.total * 100) / 100
      global.numCartItems -= 1
      console.log("items in cart: " + numCartItems)
      setTotalState(global.total)
      AsyncStorage.removeItem(listData[prevIndex].barcode)
      newData.splice(prevIndex, 1);

      for (var i = prevIndex; i < 18; i++) {
        console.log("setting quantity " + i + " to " + quantity_states[i+1][0])
       
        quantity_states[i][1](quantity_states[i+1][0])
       
        if(i+1 < newData.length){
          newData[i].quantity = newData[i+1].quantity;
        }
      }

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
                  fontSize={25}
                  value={quantity_states[data.item.key][0]}
                  onChange={(num) => {
                    quantity_states[data.item.key][1](num);
                  }}
                  onIncrease={(increased) => {
                    global.total += parseFloat(data.item.price)
                    global.total = Math.round(global.total * 100) / 100
                    setTotalState(global.total)
                    console.log("new total " + global.total)
                  }}
                  onDecrease={(decreased) => {
                    global.total -= parseFloat(data.item.price)
                    global.total = Math.round(global.total * 100) / 100
                    setTotalState(global.total)
                    console.log("new total " + global.total)
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
                onPress={useForceUpdate()}>
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
  