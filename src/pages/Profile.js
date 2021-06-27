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
  TouchableHighlight,
} from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';

const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
)

const ScreenContainer2 = ({ children }) => (
    <View style = {styles.container_2}>{children}</View>
  )


export const Profile = ({ navigation }) => {
  
    const [listData, setListData] = useState(
      Array(20)
          .fill('')
          .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
      );
  
    const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
  };
  
  
  const deleteRow = (rowMap, rowKey) => {
      closeRow(rowMap, rowKey);
      const newData = [...listData];
      const prevIndex = listData.findIndex(item => item.key === rowKey);
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
          <View>
              <Text>I am {data.item.text} in a SwipeListView</Text>
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
    return (
      <ScreenContainer2>
  
            <View style="styles.container">
              <SwipeListView
                  data={listData}
                  renderItem={renderItem}
                  //renderHiddenItem={renderHiddenItem}
                  leftOpenValue={75}
                  rightOpenValue={-150}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  onRowDidOpen={onRowDidOpen}
              />
              </View>
          
      </ScreenContainer2>
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
    backTextWhite: {
      color: '#FFF',
  },
  rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
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
      backgroundColor: 'blue',
      right: 75,
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  }
  });