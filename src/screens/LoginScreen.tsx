// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { loginUser, LoginPayload } from "../api/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
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
      navigation.navigate("Home");
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
    </View>
  );
}
