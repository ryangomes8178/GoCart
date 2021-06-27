import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

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
    
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`${nameHashMap.get(data.toString())} has been scanned and has a price of ${priceHashMap.get(data.toString())}!`);
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