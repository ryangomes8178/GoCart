import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        var barcode = data.toString()
        global.itemsFetched = false;
        console.log(global.itemsFetched)
        if (productHashMap.has(data.toString())) {
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
            <View style={styles.toptext}>
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toptext: {
        alignItems: "center",
        top: 30,

    },
});