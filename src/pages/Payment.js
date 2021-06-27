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
  ScrollView, 
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import CreditCard from 'react-native-credit-card-form-ui';

const ScreenContainer = ({ children }) => (
    <View style = {styles.container}>{children}</View>
  )

  export const Payment = ({ navigation }) => {
    const creditCardRef = React.useRef();

    const handleSubmit = React.useCallback(() => {
      if (creditCardRef.current) {
        const { error, data } = creditCardRef.current.submit();
        console.log('ERROR: ', error);
        console.log('CARD DATA: ', data);
      }
    }, []);
  
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
        </ScreenContainer>
      );
      
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    }
  });