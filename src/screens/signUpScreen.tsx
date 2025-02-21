// src/screens/SignUpScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { signupUser, SignupPayload } from "../api/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import globalStyles from "../styles/globalStyles";

type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export default function SignUpScreen({ navigation }: Props) {
  const [Username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    if (!Username || !email || !password) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }
    const payload: SignupPayload = { Username, email, password };

    try {
      const data = await signupUser(payload);
      if (data.error) {
        Alert.alert("Sign Up Error", data.error);
        return;
      }
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Home");
    } catch (error: any) {
      Alert.alert(
        "Sign Up Error",
        error.response?.data?.error || error.message
      );
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create Account</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={Username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
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
      <TouchableOpacity style={globalStyles.button} onPress={handleSignUp}>
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account?</Text>
        <Text style={{ marginTop: 20, color: "#4287F5", textAlign: "center" }}>
          Click here to login.
        </Text>
      </TouchableOpacity>
    </View>
  );
}
