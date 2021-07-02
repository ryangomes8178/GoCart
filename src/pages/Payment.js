import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView, 
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard
} from "react-native";
import CreditCard from 'react-native-credit-card-form-ui';
import Carousel from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal'
import CryptoES from "crypto-es";


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

let cardMap = new Map([
  ['visa','us_visa_card'],
  ['mastercard', 'us_mastercard_card'],
  ['american-express', 'in_amex_card']
]);
  
const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
  )



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@card_key', jsonValue)
    } catch (e) {
      // saving error
      console.log("saving error")
    }
  }

  const storeCard = async (index, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@current_card', jsonValue)
      await AsyncStorage.setItem('@current_card_index', index.toString())
    } catch (e) {
      // saving error
      console.log("saving error")
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@card_key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log("error reading")
    }
  }

  const getCardIndex = async () => {
    try {
      const index = await AsyncStorage.getItem('@current_card_index')
      return index != null ? index : null; 
    } catch (e) {
      console.log("error reading")
    }
  }


  

export const Payment = ({ navigation }) => {

    var [isVisible, setVisibility] = useState(false);
    const [textInput, setTextInput] = useState("")
    const [inStoreBalance, setInStoreBalance] = useState(0)
  
      var [state, setState] = useState({
      activeIndex:0,
      carouselItems: [

         
      // {
      //     title:"Item 1",
      //     text: "Text 1",
      //     imgUrl: "https://i.imgur.com/5oUkgLB.png",
      // },
      // {
      //     title:"348592937859236",
      //     text: "Ronaldo Gomez",
      //     imgUrl:"https://i.imgur.com/JWqsQan.png",
          
      // },
      // {
      //     title:"Item 3",
      //     text: "Text 3",
      //     imgUrl:"https://i.imgur.com/deGaUxh.png",
          
      // },
      // {
      //     title:"Item 4",
      //     text: "Text 4",
      //     imgUrl:"https://i.imgur.com/mUVxJha.png",
          
      // },
      // {
      //     title:"Item 5",
      //     text: "Text 5",
      //     imgUrl:"",
          
      // },
    ]
   })


   renderButton = (text, onPress) => (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  

  async function handleSubmitFunds(){
    const currIndex = await getCardIndex();
    console.log(textInput);
        if (!isNaN(textInput)) {
          //cardToWalletCALL(state.carouselItems[currIndex], textInput)
          addFundsToWallet(textInput)
          setInStoreBalance(textInput)
          setVisibility(false);
        }

  }
  renderModalContent = () => (
    <View style={styles.modalContent}>
      
      <Text>How much should I add?</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 20}}
        onChangeText = {text => setTextInput(text)}
        value = {textInput}

      />
      {renderButton('Add Funds', handleSubmitFunds)}
      {renderButton('Close', () => setVisibility(false))}
    </View>
  );

  const creditCardRef = React.useRef();
  
  function getWallet() {

  }
  function cardToWalletCALL(card, amount) {
    //API CALL (CARD TO WALLET PAYMENT)
    var http_method = 'post';                // Lower case.
    var url_path = '/v1/payments';    // Portion after the base URL.
    var salt = CryptoES.lib.WordArray.random(12);  // Randomly generated for each request.
    var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
                                            // Current Unix time.
    var access_key = '8E34CFD95D661EF7946E';     // The access key received from Rapyd.
    var secret_key = '5001ae0c57b14924dc361c69d2873c93246f9a22e26168ec514dfcaaa35e853bcd9c72c28dbca3c7';     // Never transmit the secret key by itself.

    var body = JSON.stringify({
      "amount": amount,
      "currency": "USD",
      "payment_method": {
        "type": cardMap.get(card.brand),
        "fields": {
          "number": card.fullNumber.replace(/\s/g, ''),
          "expiration_month": card.expiration.substr(0, 2),
          "expiration_year": card.expiration.substr(3),
          "name": card.holder,
          "cvv": card.cvv
        },
        "metadata": {
          "merchant_defined": true
        }
      },
      "ewallets": [
        {
          "ewallet": "ewallet_6c61066d4528f18063ca4e78fcb54f3f",
          "percentage": 100
        }
      ],
      "capture": true
    });

    console.log(body)

    var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + body;

    var signature = CryptoES.enc.Hex.stringify(CryptoES.HmacSHA256(to_sign, secret_key));

    signature = CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(signature));
    var options = {
      'method': 'POST',
      'url': 'https://sandboxapi.rapyd.net' + url_path,
      "body": body,
      'headers': {
        'Content-Type': 'application/json',
        'access_key': access_key,
        'salt': salt,
        'timestamp': timestamp,
        'signature': signature,
      }
    };


  fetch(options.url, options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }


  function addFundsToWallet(amount) {
    //API CALL (CARD TO WALLET PAYMENT)
    var http_method = 'post';                // Lower case.
    var url_path = '/v1/account/deposit';    // Portion after the base URL.
    var salt = CryptoES.lib.WordArray.random(12);  // Randomly generated for each request.
    var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
                                            // Current Unix time.
    var access_key = '8E34CFD95D661EF7946E';     // The access key received from Rapyd.
    var secret_key = '5001ae0c57b14924dc361c69d2873c93246f9a22e26168ec514dfcaaa35e853bcd9c72c28dbca3c7';     // Never transmit the secret key by itself.

    var body = JSON.stringify({
      "ewallet": "ewallet_6c61066d4528f18063ca4e78fcb54f3f",
      "amount": amount,
      "currency": "USD",
         "metadata": {
         "merchant_defined": true
        }
     });

    console.log(body)

    var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + body;

    var signature = CryptoES.enc.Hex.stringify(CryptoES.HmacSHA256(to_sign, secret_key));

    signature = CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(signature));
    var options = {
      'method': 'POST',
      'url': 'https://sandboxapi.rapyd.net' + url_path,
      "body": body,
      'headers': {
        'Content-Type': 'application/json',
        'access_key': access_key,
        'salt': salt,
        'timestamp': timestamp,
        'signature': signature,
      }
    };


  fetch(options.url, options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  var clone = JSON.parse(JSON.stringify(state.carouselItems))
  clone[0].title = (parseFloat(clone[0].title) + parseFloat(amount)).toString();


  setState({carouselItems: clone})

  }


  async function handleAddBalance() {
    const currIndex = await getCardIndex();
    console.log(currIndex)
    if (currIndex != 0) {
      setVisibility(true)
    }
  }

  async function pushToCarousel(data) {

      var fetched_carousel_items = await getData();  

      if (fetched_carousel_items == null) {
        fetched_carousel_items = []
      }    

      var prevState = fetched_carousel_items;
      prevState.push(data)
      setState({carouselItems: prevState})
      storeData(prevState)
      

      if(state.carouselItems.length == 1) {
        saveSelectedCard(0)
      }    
  }

  const handleSubmit = React.useCallback(() => {
    Keyboard.dismiss()
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      var CCnumber = data.number.slice(data.number.length - 4);
      var cardType = ""
      if (data.brand == "visa") {
        cardType = "https://i.imgur.com/deGaUxh.png"
      }
      if (data.brand == "american-express") {
        cardType = "https://i.imgur.com/JWqsQan.png"
      }
      if (data.brand == "mastercard") {
        cardType = "https://i.imgur.com/5oUkgLB.png"
      }
      
      var userData = {
        title: CCnumber,
        text: data.holder,
        imgUrl: cardType,

        brand: data.brand,
        fullNumber: data.number,
        expiration: data.expiration,
        holder: data.holder, 
      }

      pushToCarousel(userData)

    }
  }, []);

  const _renderItem = ({item, index}) => {
    return (
        <View style={styles.chaka}>
          <Image source={{uri: item.imgUrl}} style = {styles.image} />
            <Text style={{fontSize: 30}}>{ item.title }</Text>
            <Text>{item.text}</Text>
        </View>
    );
  }

  const saveSelectedCard = (slideIndex) => {
    storeCard(slideIndex, state.carouselItems[slideIndex])
  }

  async function updateStoreCredit(current_carousel) {
   //API CALL (CARD TO WALLET PAYMENT)
    var http_method = 'get';                // Lower case.
    var url_path = '/v1/user/ewallet_6c61066d4528f18063ca4e78fcb54f3f/accounts';    // Portion after the base URL.
    var salt = CryptoES.lib.WordArray.random(12);  // Randomly generated for each request.
    var timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();
                                            // Current Unix time.
    var access_key = '8E34CFD95D661EF7946E';     // The access key received from Rapyd.
    var secret_key = '5001ae0c57b14924dc361c69d2873c93246f9a22e26168ec514dfcaaa35e853bcd9c72c28dbca3c7';     // Never transmit the secret key by itself.

    var body = "";

    var to_sign = http_method + url_path + salt + timestamp + access_key + secret_key + body;

    var signature = CryptoES.enc.Hex.stringify(CryptoES.HmacSHA256(to_sign, secret_key));

    signature = CryptoES.enc.Base64.stringify(CryptoES.enc.Utf8.parse(signature));
    var options = {
      'method': 'GET',
      'url': 'https://sandboxapi.rapyd.net' + url_path,
      "body": body,
      'headers': {
        'Content-Type': 'application/json',
        'access_key': access_key,
        'salt': salt,
        'timestamp': timestamp,
        'signature': signature,
      }
    };

  fetch(options.url, options)
    .then(response => response.text())
    .then((result) => {

      result = JSON.parse(result)

      var clone = current_carousel

      clone[0].title = result.data[0].balance.toString()

      setState({carouselItems: clone})
      storeData(clone)
    })
    .catch(error => console.log('error', error));    
  }
  
  useFocusEffect(

    React.useCallback(() =>  {

      console.log("focused")


      async function updateList(){
 
        var fetched_carousel_items = await getData();
        updateStoreCredit(fetched_carousel_items);
        const currIndex = await getCardIndex();
        setState({carouselItems: fetched_carousel_items})
        
        setTimeout(() => this.carousel.snapToItem(currIndex, animated=false, fireCallback=false), 100)
        
        Keyboard.dismiss()
      }

      updateList();
    }, [])
  );

    return (
      
      <ScreenContainer>
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={20}
              style={styles.container}
              >
              <CreditCard ref={creditCardRef} />
              <Button title="Add Card" onPress={handleSubmit} />
          </KeyboardAvoidingView>
          <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center', marginTop: 70}}>
          <Carousel 
            layout={"default"} layoutCardOffset={18}
            ref={ref => this.carousel = ref}
            data={state.carouselItems}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={saveSelectedCard}
          />
          </View>
          <View style = {{paddingBottom: 150}}>
          <Button title="Add Balance" onPress={handleAddBalance}/>
          </View>
          <Modal isVisible = {isVisible}>
            {renderModalContent()}
          </Modal>
          
      </ScreenContainer>
      
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30
    
  },
  chaka: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT/1.36,
    resizeMode: 'contain'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

});