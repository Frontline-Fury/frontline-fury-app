import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigaitonBar/BottomTabNavigation'; // Update path as needed

type MarketScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GameStats'>;
};

const MarketScreen: React.FC<MarketScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#E0E0E0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Game Stats</Text>
        <View style={{ width: 24 }} /> {/* Empty view for alignment */}
      </View>
      
      <ScrollView style={styles.content}>
        {/* Overall Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>142</Text>
              <Text style={styles.statLabel}>Games Played</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>68%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>820</Text>
              <Text style={styles.statLabel}>Avg Score</Text>
            </View>
            
            <View style={styles.statCard}>
              <Text style={styles.statValue}>1,243</Text>
              <Text style={styles.statLabel}>High Score</Text>
            </View>
          </View>
        </View>
        
        {/* Recent Games */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Games</Text>
          
          {[1, 2, 3].map((game) => (
            <View key={game} style={styles.gameCard}>
              <View style={styles.gameHeader}>
                <Text style={styles.gameDate}>Apr {10 + game}, 2025</Text>
                <View style={[
                  styles.resultBadge, 
                  game % 2 === 0 ? styles.winBadge : styles.lossBadge
                ]}>
                  <Text style={styles.resultText}>
                    {game % 2 === 0 ? 'WIN' : 'LOSS'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.gameDetails}>
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Score</Text>
                  <Text style={styles.detailValue}>{750 + (game * 45)}</Text>
                </View>
                
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Accuracy</Text>
                  <Text style={styles.detailValue}>{62 + (game * 4)}%</Text>
                </View>
                
                <View style={styles.detailColumn}>
                  <Text style={styles.detailLabel}>Time</Text>
                  <Text style={styles.detailValue}>{8 - game}:32</Text>
                </View>
              </View>
            </View>
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Games</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#282E34',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  gameCard: {
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameDate: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  winBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  lossBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  viewAllButton: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#3A7CA5',
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default MarketScreen;