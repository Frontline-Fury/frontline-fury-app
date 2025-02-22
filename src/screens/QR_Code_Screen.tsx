import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";

import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number };
  QRScanner: undefined; // Add this line
  // other routes...
};

type QRScannerScreenNavigationProp = StackNavigationProp<RootStackParamList, 'QRScanner'>;

const QRScannerScreen = ({ navigation }: { navigation: QRScannerScreenNavigationProp }) => {
  const [scannedData, setScannedData] = useState("");

  const handleScan = (event: { data: React.SetStateAction<string>; }) => {
    setScannedData(event.data);
    alert(`Scanned: ${event.data}`);
    navigation.goBack(); // Go back to the previous screen after scanning
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleScan}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={<Text style={styles.text}>Scan a QR Code</Text>}
        bottomContent={<Text style={styles.text}>Align the QR code inside the frame</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default QRScannerScreen;
