import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "./src/screens/signUpScreen";
import LoginScreen from "./src/screens/LoginScreen";
import MainNavigator from "./src/navigaitonBar/BottomTabNavigation";
import { RootStackParamList } from "../frontline-fury-app/src/main/types";
import ProfileScreen from "./src/screens/Profile";
import PlayerProfile from "./src/screens/PlayerProfile";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{gestureEnabled: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/>
        <Stack.Screen name="MainApp" component={MainNavigator} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="PlayerProfile" component={PlayerProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
