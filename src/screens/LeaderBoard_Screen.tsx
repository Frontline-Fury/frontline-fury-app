import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('Today');
  
  
  const topPlayers = [
    { id: 2, name: 'Tarun', score: 155, avatar: 'https://robohash.org/Tarun', color: '#4b96dc'},  // Blue (2nd)
    { id: 1, name: 'Karan', score: 175, avatar: 'https://robohash.org/Karan', color: '#e55a76'}, // Red (1st)
    { id: 3, name: 'Divyansh', score: 130, avatar: 'https://robohash.org/Divyansh', color: '#78c26d'}, // Green (3rd)
  ];
  
  const allPlayers = [
    { id: 4, name: 'Atul', score: 123, rank: 4, avatar: 'https://robohash.org/atul'},
    { id: 5, name: 'Rajat', score: 120, rank: 5, avatar: 'https://robohash.org/rajat'},
    { id: 6, name: 'Anmol', score: 112, rank: 6, avatar: 'https://robohash.org/anmol'},
    { id: 7, name: 'Shouray', score: 109, rank: 7, avatar: 'https://robohash.org/shouray'},
    { id: 8, name: 'Abhi', score: 100, rank: 8, avatar: 'https://robohash.org/abhi'},
    { id: 9, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 10, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 11, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 12, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 13, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 14, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
    { id: 15, name: 'Princ', score: 95, rank: 9, avatar: 'https://robohash.org/princ'},
  ];
  
  const renderTopThree = () => {
    // Arrange in order: 2nd (blue), 1st (red), 3rd (green)
    const ordered = [
      topPlayers.find(p => p.id === 2), // Second place - blue
      topPlayers.find(p => p.id === 1), // First place - red
      topPlayers.find(p => p.id === 3), // Third place - green
    ];
    
    return (
      <View style={styles.topPlayersContainer}>
        {ordered.map((player, index) => {
          const position = index === 0 ? 2 : index === 1 ? 1 : 3;
          
          return (
            <View 
              key={player?.id ?? index} 
              style={[
                styles.topPlayerCard,
                { backgroundColor: player?.color ?? '#gray' }
              ]}
            >
              <Image 
                source={{ uri: player?.avatar ?? 'https://via.placeholder.com/40' }} 
                style={styles.topAvatar} 
                resizeMode="cover"
              />

              
              
              <View style={[
                styles.medalContainer,
              ]}>
                
                <Text style={styles.medalText}>{position}</Text>
              </View>
              <Text style={styles.topPlayerName}>{player?.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Top 3 Players */}
      {renderTopThree()}
      
      {/* Tab selection */}
      <View style={styles.tabContainer}>
        {['Today', 'This week', 'This month'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* List of all players */}
      <ScrollView style={styles.scrollView}>
        {allPlayers.map((player) => (
          <View key={player.id} style={styles.playerRow}>
            <View style={styles.playerInfo}>
              <Image source={{ uri: player.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerScore}>{player.score} Points</Text>
              </View>
            </View>
            <View style={styles.rankContainer}>
              <Text style={styles.rankText}>{player.rank}<Text style={styles.rankSuffix}>th</Text></Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1526',
    paddingTop: 20,
  },
  topPlayersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  topPlayerCard: {
    borderRadius: 15,
    width: 80,
    height: 80,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderWidth: 2,
    borderColor: '#1c2d49',
  },
  topAvatar: {
    marginTop: 45,
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  topPlayerName: {
    fontSize: 12,
    paddingTop: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  medalContainer: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: '#eaeaea',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1c2d49',
  },
  medalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  tabText: {
    fontSize: 16,
    color: '#7a8496',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#1c2d49',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  playerName: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  playerScore: {
    fontSize: 14,
    color: '#8294aa',
  },
  rankContainer: {
    alignItems: 'flex-end',
  },
  rankText: {
    fontSize: 20,
    color: '#3cf36f',
    fontWeight: 'bold',
  },
  rankSuffix: {
    fontSize: 12,
    color: '#3cf36f',
    fontWeight: 'normal',
    top: -5,
  },
});

export default LeaderBoard;