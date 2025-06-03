import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigaitonBar/BottomTabNavigation'; // Update path as needed
import styles from '../../styles/SupportStyle'; // Update path as needed
type SupportScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GameStats'>;
};

const SupportScreen: React.FC<SupportScreenProps> = ({ navigation }) => {
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



export default SupportScreen;