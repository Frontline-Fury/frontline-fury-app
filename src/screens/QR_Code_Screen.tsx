import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Alert, Button } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number };
  QRScanner: undefined;
};

type QRScannerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "QRScanner"
>;

const QRScannerScreen = ({
  navigation,
}: {
  navigation: QRScannerScreenNavigationProp;
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    Alert.alert("Scanned!", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
      { text: "Go Back", onPress: () => navigation.goBack() },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Grant Permission"
          onPress={() => Camera.requestCameraPermissionsAsync()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => (cameraRef.current = ref)}
        style={StyleSheet.absoluteFillObject}
        type={CameraType.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default QRScannerScreen;
