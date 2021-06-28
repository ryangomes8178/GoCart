import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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
} from "react-native";
import CreditCard from 'react-native-credit-card-form-ui';
import Carousel from 'react-native-snap-carousel';
//import { AsyncStorage } from '@react-native-community/async-storage';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
  
const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
  )

export const Payment = ({ navigation }) => {
  
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
  
  const creditCardRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
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
      
      var userData = {title: CCnumber, text: data.holder, imgUrl: cardType}
      var prevState = state.carouselItems;
      prevState.push(userData)
      console.log(prevState)
      setState({carouselItems: prevState})
      //saveData(state.carouselItems)
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
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, state.carouselItems)
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }
  const ReadData = async () => {
    try {
      const userState = await AsyncStorage.getItem(STORAGE_KEY)
  
      if (userState !== null) {
        setState({carouselItems: userState})
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
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
          <View style={{ flex: 1, flexDirection:'column', justifyContent: 'center'}}>
          <Carousel
            layout={"default"} layoutCardOffset={18}
            ref={ref => this.carousel = ref}
            data={state.carouselItems}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
          />
          </View>
      </ScreenContainer>
    );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});