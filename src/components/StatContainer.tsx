import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageSourcePropType } from 'react-native';

// Define the types for our player stats
interface PlayerStats {
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
}

// Avatar component that changes based on selected stat
const PlayerAvatar: React.FC<{
  selectedStat: 'kd' | 'winPercentage' | null;
  stats: PlayerStats;
}> = ({ selectedStat, stats }) => {
  // Different avatar states - using require for local images
  // For TypeScript, we explicitly type these as ImageSourcePropType
  const baseAvatarImage: ImageSourcePropType = require('../../assets/base.jpeg');
  const damagedAvatarImage: ImageSourcePropType = require('../../assets/damaged.jpeg');
  const trophyImage: ImageSourcePropType = require('../../assets/Ruby_converted-removebg-preview.png');

  // Determine which avatar to show based on the selected stat
  const getAvatarSource = (): ImageSourcePropType => {
    if (!selectedStat) return baseAvatarImage;
    
    if (selectedStat === 'kd') {
      return damagedAvatarImage;
    } else if (selectedStat === 'winPercentage') {
      return baseAvatarImage; // We'll overlay the trophy on this
    }
    
    return baseAvatarImage;
  };

  return (
    <View style={styles.avatarContainer}>
      <Image source={getAvatarSource()} style={styles.avatar} />
      {selectedStat === 'winPercentage' && (
        <Image 
          source={trophyImage}
          style={styles.trophyOverlay} 
        />
      )}
    </View>
  );
};

// Main component
const StatContainer: React.FC = () => {
  // Sample player stats (these would come from your data source)
  const [stats, setStats] = useState<PlayerStats>({
    kills: 250,
    deaths: 100,
    wins: 45,
    losses: 15,
  });

  // State to track which stat is selected
  const [selectedStat, setSelectedStat] = useState<'kd' | 'winPercentage' | null>(null);

  // Calculate derived stats
  const kd = stats.deaths > 0 ? (stats.kills / stats.deaths).toFixed(2) : stats.kills.toString();
  const winPercentage = stats.wins + stats.losses > 0 
    ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1) 
    : '0';

  // Handler for stat selection
  const handleStatSelect = (stat: 'kd' | 'winPercentage') => {
    if (selectedStat === stat) {
      setSelectedStat(null);
    } else {
      setSelectedStat(stat);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        {/* Stats display section (hidden details but visible results) */}
        <View style={styles.statsRow}>
          <TouchableOpacity 
            style={[styles.statItem, selectedStat === 'kd' && styles.selectedStat]} 
            onPress={() => handleStatSelect('kd')}
          >
            <Text style={styles.statLabel}>K/D</Text>
            <Text style={styles.statValue}>{kd}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.statItem, selectedStat === 'winPercentage' && styles.selectedStat]} 
            onPress={() => handleStatSelect('winPercentage')}
          >
            <Text style={styles.statLabel}>Win %</Text>
            <Text style={styles.statValue}>{winPercentage}%</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsRowSecondary}>
          <View style={styles.statItemSecondary}>
            <Text style={styles.statLabel}>Wins</Text>
            <Text style={styles.statValue}>{stats.wins}</Text>
          </View>
          
          <View style={styles.statItemSecondary}>
            <Text style={styles.statLabel}>Losses</Text>
            <Text style={styles.statValue}>{stats.losses}</Text>
          </View>
        </View>
      </View>
      
      {/* Avatar section */}
      <PlayerAvatar 
        selectedStat={selectedStat}
        stats={stats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:"95%",
    backgroundColor: '#2A2D3E',
    borderRadius: 12,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsContainer: {
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statsRowSecondary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: '#383B4F',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  statItemSecondary: {
    flex: 1,
    padding: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedStat: {
    backgroundColor: '#4A63EE',
  },
  statLabel: {
    color: '#B0B3C7',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    width: "70%",
    height: 150,
    borderRadius: 0,
  },
  trophyOverlay: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 0,
    right: 10,
  },
});

export default StatContainer;