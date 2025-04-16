import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Screen dimensions
const { width } = Dimensions.get('window');

// Mock data for players with more realistic scores and images
const players = [
  { id: '1', name: 'S2AT', score: 1500, rank: 1, image: require('../../assets/a1.jpeg') },
  { id: '2', name: 'Alice', score: 1450, rank: 2, image: require('../../assets/a2.jpeg') },
  { id: '3', name: 'Bob', score: 1400, rank: 3, image: require('../../assets/a3.jpeg') },
  { id: '4', name: 'Charlie', score: 1350, rank: 4, image: require('../../assets/a2.jpeg') },
  { id: '5', name: 'David', score: 1300, rank: 5, image: require('../../assets/a2.jpeg') },
  { id: '6', name: 'Eve', score: 1250, rank: 6, image: require('../../assets/a2.jpeg') },
  { id: '7', name: 'Frank', score: 1200, rank: 7, image: require('../../assets/a2.jpeg') },
  { id: '8', name: 'Grace', score: 1150, rank: 8, image: require('../../assets/a2.jpeg') },
  { id: '9', name: 'Hannah', score: 1100, rank: 9, image: require('../../assets/a2.jpeg') },
  { id: '10', name: 'Isaac', score: 1050, rank: 10, image: require('../../assets/a2.jpeg') },
  { id: '11', name: 'Jack', score: 1000, rank: 11, image: require('../../assets/a2.jpeg') },
  { id: '12', name: 'Katie', score: 950, rank: 12, image: require('../../assets/a2.jpeg') },
];

// Define types for players
type Player = {
  id: string;
  name: string;
  score: number;
  rank: number;
  image: any;
};

const LeaderBoardScreen: React.FC = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'Overall' | 'Weekly'>('Overall');

  // Header Component with Gradient
  const HeaderComponent = useCallback(() => (
    <LinearGradient
      colors={['#0A3D62', '#3A7CA5']}
      style={styles.headerContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/ff.png')}
          style={styles.headerLogo}
        />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitlePrimary}>FrontlineFury</Text>
        </View>
      </View>
    </LinearGradient>
  ), []);

  // Render Top 3 Players
  const renderTopPlayers = useCallback(() => {
    const topPlayers = players.slice(0, 3);

    return (
      <View style={styles.topPlayersContainer}>
        {topPlayers.map((player) => (
          <View key={player.id} style={styles.topPlayerCard}>
            <Image source={player.image} style={styles.topPlayerImage} />
            <View style={styles.topPlayerDetails}>
              <Text style={styles.topPlayerName}>{player.name}</Text>
              <Text style={styles.topPlayerScore}>Score: {player.score}</Text>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{player.rank}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }, []);

  // Render Other Players
  const renderPlayerItem = useCallback(({ item }: { item: Player }) => (
    <View style={styles.playerCard}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerRank}>{item.rank}</Text>
        <Image source={item.image} style={styles.playerImage} />
        <Text style={styles.playerName}>{item.name}</Text>
      </View>
      <Text style={styles.playerScore}>{item.score}</Text>
    </View>
  ), []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View>
            {HeaderComponent()}
            <View style={styles.tabsContainer}>
              {['Overall', 'Weekly'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabButton,
                    activeTab === tab && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab(tab as 'Overall' | 'Weekly')}
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
            {renderTopPlayers()}
          </View>
        }
        data={players.slice(3)}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponentStyle={styles.listHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
  },
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  headerTitleContainer: {
    alignItems: 'flex-end',
  },
  headerTitlePrimary: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listHeader: {
    backgroundColor: '#1E2329',
    paddingHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#3A7CA5',
    borderRadius: 25,
    padding: 5,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  tabText: {
    fontSize: 16,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  topPlayersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  topPlayerCard: {
    alignItems: 'center',
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 10,
    width: width / 3.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topPlayerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  topPlayerDetails: {
    alignItems: 'center',
  },
  topPlayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topPlayerScore: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginRight: 10,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  playerName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  playerScore: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  rankBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: 5,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default LeaderBoardScreen;