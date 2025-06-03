
// PlayerProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../styles/PlayerProfileStyle'; // Adjust the import path as necessary
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




export default PlayerProfileScreen;
