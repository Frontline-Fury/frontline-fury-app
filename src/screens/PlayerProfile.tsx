<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';
import DropDownPicker from 'react-native-dropdown-picker';
import StatContainer from "../components/StatContainer";


type PlayerProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PlayerProfile'>;
};

const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'TDM', value: 'Team Death Match' },
    { label: 'CTF', value: 'Capture The Flag' },
    { label: 'SPIKE', value: 'Spike Rush' },
  ]);

  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Player Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Player Name Tag */}
      <View style={styles.nameTag}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>S2AT</Text>
          <Text style={{ fontSize: 16, color: '#777' }}>#6969</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/Ruby_converted-removebg-preview.png')}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={{ fontSize: 12, color: '#777' }}>Ruby I</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ height: 102000 }}
          data={[{}]} // Dummy data to render the component once
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 500 }} // Increases scrollable height
          renderItem={() => (
            <View>
              {/* Your Stats Container and other contents */}
              <View style={styles.statsContainer}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="All"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />

                {/* Tabs for Filtering */}
                <View style={styles.tabsContainer}>
                  {['All', 'Ranked', 'Casual'].map((tab) => (
                    <TouchableOpacity
                      key={tab}
                      style={[
                        styles.tabButton,
                        activeTab === tab && styles.activeTab
                      ]}
                      onPress={() => setActiveTab(tab)}
                    >
                      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Common Stats */}
                <View style={styles.CommonStats}>
                  <View style={styles.cont1}>
                    <View style={styles.cont1A}>
                      <Text style={styles.statstext}>Win</Text>
                    </View>
                    <View style={styles.cont1B}>
                      <Text style={styles.statstext}>Top Ten's</Text>
                    </View>
                  </View>

                  <View style={styles.cont2}>
                    <View style={styles.cont2A}>
                      <Text style={styles.statstext}>Win%</Text>
                    </View>
                    <View style={styles.cont2B}>
                      <Text style={styles.statstext}>Games played</Text>
                      <Text style={styles.statstext1}>K/D</Text>
                    </View>
                  </View>

                  <View style={styles.cont3}>
                    <View style={styles.cont3A}>
                      <Text style={styles.statstext}>Kil</Text>
                    </View>
                    <View style={styles.cont3B}>
                      <Text style={styles.statstext}>Best Rank</Text>
                    </View>
                  </View>


                </View>
                <View style={{ flex: 1, width: "100%", height: "50%", borderColor: "#000", borderWidth: 1 }}>
                  <StatContainer 
                    title="Player Statistics"
                    stats={{
                      kills: 0,
                      deaths: 0,
                      wins: 0,
                      losses: 0
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
=======
// PlayerProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// Mock data for player profile
const playerData = {
  id: '12345',
  username: 'GhostSniper42',
  realName: 'Alex Johnson',
  level: 28,
  xp: 5480,
  nextLevelXp: 6000,
  profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
  team: 'Shadow Wolves',
  rank: 'Lieutenant',
  reputation: 4.8,
  gamesPlayed: 147,
  wins: 98,
  losses: 49,
  winRate: '66.7%',
  killCount: 1205,
  accuracy: '78.2%',
  badges: [
    { id: '1', name: 'Marksman', icon: 'bullseye', count: 3 },
    { id: '2', name: 'Tactician', icon: 'chess-knight', count: 2 },
    { id: '3', name: 'Medic', icon: 'medkit', count: 1 },
    { id: '4', name: 'Team Player', icon: 'users', count: 5 },
  ],
  loadouts: [
    { id: '1', name: 'CQB Assault', primary: 'M4 CQB-R', secondary: 'Glock 17', isActive: true },
    { id: '2', name: 'Long Range', primary: 'M14 EBR', secondary: 'P226', isActive: false },
  ],
  achievements: [
    { id: '1', name: 'Last Man Standing', description: 'Win a game as the last player on your team', completed: true },
    { id: '2', name: 'Ace', description: 'Eliminate the entire enemy team solo', completed: true },
    { id: '3', name: 'Objective Master', description: 'Complete 50 objective-based missions', completed: false, progress: 38 },
  ],
  upcomingEvents: [
    { id: '1', name: 'Urban Assault', date: '2025-05-15', location: 'BattleZone Arena', registered: true },
    { id: '2', name: 'Forest Operation', date: '2025-05-29', location: 'Woodland Fields', registered: false },
  ],
  battlePass: {
    tier: 24,
    maxTier: 50,
    rewards: [
      { tier: 25, name: 'Urban Camo Skin', claimed: false },
      { tier: 30, name: '500 Fury Credits', claimed: false },
    ]
  },
  currency: 2750,
};

const PlayerProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        {/* Header with user info */}
        <LinearGradient
          colors={['#1a2634', '#2c3e50']}
          style={styles.headerContainer}
        >
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: playerData.profileImage }} style={styles.profileImage} />
              <View style={styles.levelBadge}>
                <Text style={styles.levelText}>{playerData.level}</Text>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.username}>{playerData.username}</Text>
              <Text style={styles.realName}>{playerData.realName}</Text>
              <View style={styles.teamContainer}>
                <MaterialCommunityIcons name="shield-account" size={16} color="#3a7ca5" />
                <Text style={styles.teamText}>{playerData.team}</Text>
              </View>
              <View style={styles.rankContainer}>
                <MaterialIcons name="military-tech" size={16} color="#f0ad4e" />
                <Text style={styles.rankText}>{playerData.rank}</Text>
              </View>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpContainer}>
            <View style={styles.xpProgressBar}>
              <View 
                style={[
                  styles.xpFill, 
                  { width: `${(playerData.xp / playerData.nextLevelXp) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.xpText}>
              {playerData.xp} / {playerData.nextLevelXp} XP
            </Text>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Combat Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerData.gamesPlayed}</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerData.winRate}</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerData.killCount}</Text>
              <Text style={styles.statLabel}>Eliminations</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{playerData.accuracy}</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
          </View>
        </View>

        {/* Loadouts Section */}
        <View style={styles.loadoutsContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Loadouts</Text>
            <TouchableOpacity style={styles.sectionButton}>
              <Text style={styles.sectionButtonText}>Manage</Text>
            </TouchableOpacity>
          </View>
          
          {playerData.loadouts.map(loadout => (
            <View key={loadout.id} style={[
              styles.loadoutCard, 
              loadout.isActive ? styles.activeLoadout : {}
            ]}>
              <View style={styles.loadoutHeader}>
                <Text style={styles.loadoutName}>{loadout.name}</Text>
                {loadout.isActive && (
                  <View style={styles.activeTag}>
                    <Text style={styles.activeTagText}>ACTIVE</Text>
                  </View>
                )}
              </View>
              <View style={styles.loadoutDetails}>
                <View style={styles.weaponItem}>
                  <MaterialCommunityIcons name="pistol" size={24} color="#d9534f" />
                  <Text style={styles.weaponText}>{loadout.primary}</Text>
                </View>
                <View style={styles.weaponItem}>
                  <MaterialCommunityIcons name="pistol" size={20} color="#5bc0de" />
                  <Text style={styles.weaponText}>{loadout.secondary}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Battle Pass Section */}
        <View style={styles.battlePassContainer}>
          <Text style={styles.sectionTitle}>Battle Pass - Season 3</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(playerData.battlePass.tier / playerData.battlePass.maxTier) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Tier {playerData.battlePass.tier} / {playerData.battlePass.maxTier}
            </Text>
          </View>
          <View style={styles.rewardsContainer}>
            <Text style={styles.rewardsTitle}>Upcoming Rewards:</Text>
            {playerData.battlePass.rewards.map((reward, index) => (
              <View key={index} style={styles.rewardItem}>
                <MaterialIcons name="card-giftcard" size={18} color="#5bc0de" />
                <Text style={styles.rewardText}>
                  Tier {reward.tier}: {reward.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Badges Section */}
        <View style={styles.badgesContainer}>
          <Text style={styles.sectionTitle}>Earned Badges</Text>
          <View style={styles.badgesGrid}>
            {playerData.badges.map(badge => (
              <View key={badge.id} style={styles.badgeItem}>
                <View style={styles.badgeIconContainer}>
                  <FontAwesome5 name={badge.icon} size={24} color="#f0ad4e" />
                  {badge.count > 1 && (
                    <View style={styles.badgeCount}>
                      <Text style={styles.badgeCountText}>{badge.count}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {playerData.upcomingEvents.map(event => (
            <View key={event.id} style={styles.eventCard}>
              <View>
                <Text style={styles.eventName}>{event.name}</Text>
                <Text style={styles.eventDetails}>
                  <MaterialIcons name="event" size={14} color="#aaa" /> {event.date}
                </Text>
                <Text style={styles.eventDetails}>
                  <MaterialIcons name="location-on" size={14} color="#aaa" /> {event.location}
                </Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.registerButton,
                  event.registered ? styles.registeredButton : {}
                ]}
              >
                <Text style={styles.registerText}>
                  {event.registered ? 'Registered' : 'Register'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Currency */}
        <View style={styles.currencyContainer}>
          <View style={styles.currencyBox}>
            <MaterialCommunityIcons name="cash" size={28} color="#f0ad4e" />
            <View>
              <Text style={styles.currencyLabel}>Fury Credits</Text>
              <Text style={styles.currencyValue}>{playerData.currency}</Text>
            </View>
            <TouchableOpacity style={styles.getMoreButton}>
              <Text style={styles.getMoreText}>Get More</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};
>>>>>>> ee91dd5 (Fix Broken link)

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 40,
    height: 60,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  nameTag: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderColor: '#FF6600',
    borderBottomWidth: 1,
  },
  backText: {
    height: 40,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 16,
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    width: "100%",
    backgroundColor: '#fafafa',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    width: "100%",
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "100 %",
    marginTop: 16,
    borderColor:"#000",
    borderWidth:1,

  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#ddd',

  },
  activeTab: {
    backgroundColor: '#FF6600',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  CommonStats: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: "100%",
    height: "50%",
    marginTop: 16,
    backgroundColor: '#00000050',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  cont1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  cont1A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont1B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  cont2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  cont2A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont2B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  cont3: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
  },
  cont3A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont3B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  statstext: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'popins',
    fontWeight: 'bold',
  },
  statstext1: {
    marginTop: 50,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'popins',
    fontWeight: 'bold',
  },

});

export default PlayerProfileScreen;
=======
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#3a7ca5',
  },
  levelBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d9534f',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#121212',
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  realName: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 6,
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  teamText: {
    color: '#ddd',
    marginLeft: 5,
    fontSize: 14,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    color: '#f0ad4e',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  xpContainer: {
    marginTop: 20,
  },
  xpProgressBar: {
    height: 12,
    backgroundColor: '#555',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 5,
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#5cb85c',
    borderRadius: 6,
  },
  xpText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'right',
  },
  statsContainer: {
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#2a2a2a',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  loadoutsContainer: {
    padding: 15,
    marginTop: 5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionButton: {
    padding: 6,
    paddingHorizontal: 12,
    backgroundColor: '#3a7ca5',
    borderRadius: 5,
  },
  sectionButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  loadoutCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 0,
    borderLeftColor: 'transparent',
  },
  activeLoadout: {
    borderLeftWidth: 5,
    borderLeftColor: '#5cb85c',
  },
  loadoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  loadoutName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTag: {
    backgroundColor: '#5cb85c',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  activeTagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  loadoutDetails: {
    marginTop: 5,
  },
  weaponItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  weaponText: {
    color: '#ddd',
    marginLeft: 8,
    fontSize: 14,
  },
  battlePassContainer: {
    padding: 15,
    marginTop: 5,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#555',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#f0ad4e',
    borderRadius: 6,
  },
  progressText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'right',
  },
  rewardsContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
  },
  rewardsTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 10,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rewardText: {
    color: '#ddd',
    marginLeft: 8,
    fontSize: 14,
  },
  badgesContainer: {
    padding: 15,
    marginTop: 5,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeItem: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 15,
  },
  badgeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#d9534f',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#121212',
  },
  badgeCountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeName: {
    color: '#ddd',
    fontSize: 12,
    textAlign: 'center',
  },
  eventsContainer: {
    padding: 15,
    marginTop: 5,
  },
  eventCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventDetails: {
    color: '#ccc',
    fontSize: 13,
    marginBottom: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#3a7ca5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  registeredButton: {
    backgroundColor: '#5cb85c',
  },
  registerText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  currencyContainer: {
    padding: 15,
    marginTop: 5,
    marginBottom: 15,
  },
  currencyBox: {
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyLabel: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 10,
  },
  currencyValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  getMoreButton: {
    backgroundColor: '#f0ad4e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  getMoreText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    height: 20,
  },
});

export default PlayerProfileScreen;
>>>>>>> ee91dd5 (Fix Broken link)
