
// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { loginUser, LoginPayload } from "../api/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import { RootStackParamList } from "../../src/main/types";
import globalStyles from "../styles/globalStyles";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Both email and password are required.");
      return;
    }
    const payload: LoginPayload = { email, password };

    try {
      const data = await loginUser(payload);
      if (data.error) {
        Alert.alert("Login Error", data.error);
        return;
      }
      Alert.alert("Success", "Logged in successfully!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainApp" }], // Only MainApp remains in history
        })
      );
    } catch (error: any) {
      Alert.alert("Login Error", error.response?.data?.error || error.message);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Sign Up with google</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{ flex: 0.1, flexDirection: 'row', alignItems: "center" }} 
          onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: "#000000", textAlign: "center" }}>
              Don't have an account? 
            </Text>
            <Text style={{ color: "#fe6807", textAlign: "center", marginHorizontal: 5 }}>
              Sign Up for free
            </Text>
        </TouchableOpacity>
    </View>
  );
}
