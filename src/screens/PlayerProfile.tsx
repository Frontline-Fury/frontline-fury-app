import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const menuItems = [
  { title: "Game Stats", icon: "history" },
  { title: "Matches", icon: "sports-handball" },
  { title: "Achievements", icon: "emoji-events" },
  { title: "Connection", icon: "people" },
  { title: "Market", icon: "shopping-bag" },
  { title: "Clans", icon: "military-tech" },
  { title: "Share App", icon: "share" },
  { title: "Rate us", icon: "star" },
  { title: "Support", icon: "support-agent" },
  { title: "Change Language", icon: "translate" },
  { title: "Other/Help", icon: "help-outline" }
];

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20, backgroundColor: "#fde7dc" }}>
        <Image
          source={require("../../assets/ff.png" )}
          style={{ width: 50, height: 50, borderRadius: 25 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>S2AT</Text>
          <Text style={{ color: "gray" }}>view profile</Text>
        </View>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", padding: 15, borderBottomWidth: 1, borderColor: "#ddd" }}>
            <MaterialIcons name={item.icon as keyof typeof MaterialIcons.glyphMap} size={24} color="black" style={{ marginRight: 15 }} />
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProfileScreen;
