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

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
  
const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
  )

export const Payment = ({ navigation }) => {
  
      const [state, setState] = useState({
      activeIndex:0,
      carouselItems: [
      {
          title:"Item 1",
          text: "Text 1",
      },
      {
          title:"Item 2",
          text: "Text 2",
      },
      {
          title:"Item 3",
          text: "Text 3",
      },
      {
          title:"Item 4",
          text: "Text 4",
      },
      {
          title:"Item 5",
          text: "Text 5",
      },
    ]
   })
  
  
  

  const creditCardRef = React.useRef();

  const handleSubmit = React.useCallback(() => {
    if (creditCardRef.current) {
      const { error, data } = creditCardRef.current.submit();
      //console.log('ERROR: ', error);
      console.log('CARD DATA: ', data.number);
      // console.log('CARD NUMBER: ', parseInt(data.number).substr(-4))
      var userData = {title: data.number, text: data.holder}
      setState({carouselItems: [...state.carouselItems, userData]})
    }
  }, []);

  const _renderItem = ({item, index}) => {
    return (
        <View style={styles.chaka}>
            <Text style={{fontSize: 30}}>{ item.title }</Text>
            <Text>{item.text}</Text>
        </View>
    );
  }

    return (
      <ScreenContainer>
          <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={20}
              style={styles.container}
              >
              <CreditCard ref={creditCardRef} />
              <Button title="Submit" onPress={handleSubmit} />
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
    backgroundColor: 'dodgerblue'
  },
});