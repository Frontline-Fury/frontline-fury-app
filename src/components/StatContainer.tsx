import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';

// Define the types for our player stats
interface PlayerStats {
  kills: number;
  deaths: number;
  wins: number;
  losses: number;
}

interface StatContainerProps {
  title: string;
  stats: PlayerStats;
}
interface StatItemProps {
  label: string;
  value: string | number;
  color?: string;
  icon?: ImageSourcePropType;
  progress?: number;
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

const StatItem: React.FC<StatItemProps> = ({ label, value, color = '#FFFFFF', icon, progress }) => {
  return (
    <View style={styles.statItemContainer}>
        <Text style={styles.statLabel}>{label}</Text>
        {icon && <Image source={icon} style={styles.statIcon} />}
        {progress !== undefined ? (
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
        ) : (
            <Text style={[styles.statValue, { color }]}>{value}</Text>
        )}
    </View>
  );
};

const StatContainer: React.FC<StatContainerProps> = ({ title, stats }) => {
    // Calculate derived stats
    const kd = stats.deaths > 0 ? (stats.kills / stats.deaths).toFixed(2) : stats.kills.toString();
    const winPercentage = stats.wins + stats.losses > 0
        ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1)
        : '0';
    const trophyImage: ImageSourcePropType = require('../../assets/Ruby_converted-removebg-preview.png');
    const targetIcon: ImageSourcePropType = require('../../assets/ff.png');
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.statsRow}>
                <StatItem
                    label="K/D"
                    value={kd}
                    color="#FF6B35"
                    icon={targetIcon}
                />
                 <StatItem
                    label="Win %"
                    value={`${winPercentage}%`}
                    color="#90EE90"
                    icon={trophyImage}
                />
            </View>
            <View style={styles.statsRow}>
                <StatItem label="Wins" value={stats.wins} />
                <StatItem label="Losses" value={stats.losses} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'relative',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    trophyOverlay: {
        position: 'absolute',
        width: 40,
        height: 40,
        bottom: -5,
        right: -5,
    },
    container: {
        width: "95%",
        backgroundColor: '#282E34',
        borderRadius: 12,
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    statItemContainer: {
        alignItems: 'center',
    },
    statIcon: {
        width: 24,
        height: 24,
        tintColor:"#FFFFFF",
        marginVertical: 5,
    },
    statLabel: {
        color: '#E0E0E0',
        fontSize: 14,
        marginBottom: 4,
        textAlign: 'center',
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    progressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#3A7CA5',
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FF6B35',
        borderRadius: 5,
    },
});

export default StatContainer;