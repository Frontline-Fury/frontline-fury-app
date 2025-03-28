import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import PlayerProfile from "../screens/Profile";
import Community from "../screens/Community_Screen";
import Booking from "../screens/Booking_Screen";
import LeaderBoard from "../screens/LeaderBoard_Screen";
import QRScannerScreen from "../screens/QR_Code_Screen"; // Ensure correct import path

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Header Component
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Tabs: undefined;
  QRScannerScreen: undefined;
};

const CustomHeader = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flexDirection:"row", alignSelf:"stretch", alignItems: "center", justifyContent: "space-between", width:340  }}>
      <View>
        <Image source={require("../../assets/frontlinefury.png")} style={{ width: 120, height: 30, resizeMode: "contain" }} />
      </View>
      <View  >
      <TouchableOpacity onPress={() => navigation.navigate("QRScannerScreen")}>
        <Icon name="qr-code-scanner" size={28} color="black" />
      </TouchableOpacity>
      </View> 
    </View>
  );
};


const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => <CustomHeader />, // Use custom header
        headerStyle: { backgroundColor: "#fff", height: 80 },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case "Home":
              iconName = "house";
              break;
            case "Profile":
              iconName = "person";
              break;
            case "Community":
              iconName = "groups";
              break;
            case "Booking":
              iconName = "event";
              break;
            case "LeaderBoard":
              iconName = "leaderboard";
              break;
            default:
              iconName = "circle";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#030f0f",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={PlayerProfile} />
    </Tab.Navigator>
  );
};

// Stack Navigator (Includes QR Scanner Screen)
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator} />
      <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
