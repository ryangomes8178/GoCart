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
import BarcodeView from './BarcodeView';
import SignInPage, { SignInPageFunc } from './SignInPage';
import { NavigationContainer } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';


 


const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
)

const ScreenContainer2 = ({ children }) => (
  <View style = {styles.container_2}>{children}</View>
)

export var isLoggedIn = false;

export const SignIn = ({ navigation }) => {
  return (
    <BarcodeView>
        
    </BarcodeView>
  );
};


export const PreviousOrders = ({ navigation }) => {
  
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

export const Cart = ({ navigation }) => {
  
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
                  renderHiddenItem={renderHiddenItem}
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
 
      <Button title="Login" onPress={() => {navigation.navigate("SKRT"); isLoggedin = true;}}/>
      
      
    </View>
    </ScreenContainer>
  );
  };
  
  export const SignInPage2 = ({ navigation }) => {
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
 
      <Button title="Login" onPress={() => {navigation.navigate("SKRT"); isLoggedin = true;}}/>
      
      
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
