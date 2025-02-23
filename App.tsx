import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./src/navigaitonBar/BottomTabNavigation";

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  MainApp: undefined; // This will hold the Bottom Tab Navigator
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={BottomTabNavigator} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
