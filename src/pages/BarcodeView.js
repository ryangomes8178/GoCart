import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device'
import LottieView from 'lottie-react-native';

export const BarcodeView = ({navigation}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    let priceHashMap = new Map([
        ['047400672130','$8.29']
    ]);

    let nameHashMap = new Map([
        ['047400672130','Gillette Sensor3 Disposable Razor']
    ]);

    let productHashMap = new Map([
        ['047400672130', {
            "name": "Gillette Sensor3 Dispozable Razor",
            "price": "8.29"
        }],
        ['819039021098', {
            "name": "Tile Mate + Slim (2020) 4-pack (2 Mates, 2 Slims)",
            "price": "49.99"
        }],
        ['049022517431', {
            "name": "Nice! Spring Water - 1L",
            "price": "3.99"
        }],
        ['876063006521', {
            "name": "Muscle Milk Chocolate Protein Shake",
            "price": "3.29"
        }],
        ['07199840', {
            "name": "Coors Light - 12 fl oz",
            "price": "1.00"
        }],
        ['096619321063', {
            "name": "Kirkland Extra Fancy Mixed Nuts - 40 oz",
            "price": "8.40"
        }],
        ['073854008089', {
            "name": "Bicycle Standard Playing Cards - 2pk",
            "price": "7.99"
        }],
        ['014100075226', {
            "name": "Pepperidge Farm - White Chocolate Macadamia",
            "price": "4.49"
        }], 
        ['014100074380', {
            "name": "Pepperidge Farm - Zurich Sugar Cookies",
            "price": "5.49"
        }],
        ['030000316849', {
            "name": "Quaker Instant Oatmeal, Flavor Variety",
            "price": "2.99"
        }],
        ['016000124998', {
            "name": "Lucky Charms - Galactic Edition",
            "price": "5.49"
        }],
        ['079893116488', {
            "name": "Organic Fruit Twists - Strawberry/Banana",
            "price": "4.49"
        }],
        ['089036442800', {
            "name": "Torani Vanilla Syrup",
            "price": "6.49"
        }],
        ['762111206022', {
            "name": "Starbucks Dark Espresso Roast",
            "price": "5.49"
        }],
        ['021130470174', {
            "name": "Signature Select Pitted Olives",
            "price": "2.99"
        }],
        ['079893407982', {
            "name": "Organic Mango Habenero Hot Sauce",
            "price": "6.49"
        }],
        ['01346604', {
            "name": "Heinz Tomato Ketchup",
            "price": "3.49"
        }],
        ['307660746102', {
            "name": "Tums Assorted Fruit",
            "price": "5.99"
        }],
        ['044000032029', {
            "name": "Oreo Chocolate Sandwich Cookies", 
            "price": '5.99'
        }]
    ])

    const storeData = async (key, value) => {
      try {
        value.quantity = 1;
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
      } catch (e) {
        // saving error
        alert('Something went wrong saving your cart, please try again!');
      }
    }


    const getData = async (key) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
        alert('Something went wrong reading your cart, please restart the app !');
      }
    }

    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setTimeout(() => {
            setScanned(false);
          }, 5000)
        var barcode = data.toString()


        //hacky fix for weird scanning on iPhones
        if (Device.brand == "Apple") {
            barcode = barcode.substr(1)
        }
        
        if (productHashMap.has(barcode)) {
            alert(`${productHashMap.get(barcode).name} has been scanned and has a price of ${productHashMap.get(barcode).price}!`);
            storeData(barcode, productHashMap.get(barcode))
            getData(barcode)
        } else {
            alert('The item\'s barcode (' + barcode + ') did not match any products in our system.')
        }
    };
    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            
            <View>
            <LottieView
            style={styles.scan}
            source = {require("../../assets/16589-qrcode-scanner.json")}
            autoPlay = {true}
            loop = {true}
            />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    scan: {
        // width:300,
        // height:300,
        // paddingTop:110,
        // paddingLeft:40
        width:300,
        height:300
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    toptext: {
        alignItems: "center",
        top: 30,

    },
    
});