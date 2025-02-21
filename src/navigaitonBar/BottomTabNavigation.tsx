import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";

// Define TypeScript types for screen names
type BottomTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Community: undefined;
  Booking: undefined;
  LeaderBoard: undefined;
};


const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Home Screen</Text>
  </View>
);
const PlayerProfile = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Profile Screen</Text>
  </View>
);
const Community = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Community Screen</Text>
  </View>
);
const Booking = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Booking Screen</Text>
    </View>
);
const LeaderBoard = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>LeaderBoard Screen</Text>
    </View>
);

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (

      <Tab.Navigator
        screenOptions={({ route }) => ({
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
                iconName = "users-between-lines";
                break;
              case "Booking":
                iconName = "gamepad";
              case "LeaderBoard":
                iconName = "stairs";
              default:
                iconName = "circle";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#191bdf",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { backgroundColor: "#fff", paddingTop: 6, height:65 },
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

export default BottomTabNavigator;
