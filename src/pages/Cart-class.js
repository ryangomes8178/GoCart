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

class Cart extends Component {

	async fetchAllItems() {
	  try {
	      const keys = await AsyncStorage.getAllKeys()
	      const items = await AsyncStorage.multiGet(keys)
	      var cart_listData = [];

	      var element;
	      for (var i = 0; i < items.length; i++) {
	        element = items[i];
	        var itemDetails = JSON.parse(element[1])
	        cart_listData.push({
	          "key": i,
	          "text": itemDetails.name,
	          "quantity": itemDetails.quantity,
	          "price": itemDetails.price
	        })
	      }
	      console.log(cart_listData)
	      return cart_listData
	  } catch (error) {
	      console.log(error, "problemo")
	  }
	}

  
	constructor(props) {

		super(props);

		/*this.state = {
		  data: null,
		  isLoading: false,
		  error: null
		}*/

	}

	render() {
	    return (
		    	<View style = {styles.container_2}>
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
		                onPress={() => {console.log(global.itemsFetched)}}>
		                <Text style={{color: 'white', fontSize: 16}}>Checkout - <Text style={{fontWeight:"bold"}}>$39.51</Text></Text>
		              </TouchableOpacity>

		          </View>

		      </View>
		    );
	}
}