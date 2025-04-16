import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigaitonBar/BottomTabNavigation"; // Update import path to match your file structure

// Define menu items with screen navigation targets
const menuItems = [
  { title: "Game Stats", icon: "history", screen: "GameStats" },
  { title: "Matches", icon: "sports-handball", screen: "Matches" },
  { title: "Achievements", icon: "emoji-events", screen: "Achievements" },
  { title: "Connection", icon: "people", screen: "Connection" },
  { title: "Market", icon: "shopping-bag", screen: "Market" },
  { title: "Clans", icon: "military-tech", screen: "Clans" },
  { title: "Share App", icon: "share", screen: "ShareApp" },
  { title: "Rate us", icon: "star", screen: "RateUs" },
  { title: "Support", icon: "support-agent", screen: "Support" },
  { title: "Change Language", icon: "translate", screen: "ChangeLanguage" },
  { title: "Other/Help", icon: "help-outline", screen: "Help" }
];

type ProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Tabs'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Function to handle menu item navigation
  const handleMenuItemPress = (screenName: string) => {
    navigation.navigate(screenName as keyof RootStackParamList);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.card, styles.headerContainer]}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>S2AT</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PlayerProfile')}>
            <Text style={styles.viewProfile}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.card, styles.menuItemsContainer]}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => handleMenuItemPress(item.screen)}
            >
              <MaterialIcons 
                name={item.icon as keyof typeof MaterialIcons.glyphMap} 
                size={24} 
                color="#E0E0E0" 
                style={styles.icon} 
              />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  viewProfile: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  menuItemsContainer: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A7CA5',
  },
  icon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  card: {
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
  },
});

export default ProfileScreen;