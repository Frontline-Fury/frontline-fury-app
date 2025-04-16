import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

// Define props interface with TypeScript
interface GameCardProps {
  gameMode: string;
  date: string;
  map: string;
  result: 'Win' | 'Loss';
  score: number;
}

const GameCard: React.FC<GameCardProps> = ({
  gameMode = "Battle Royale",
  date = "April 15, 2025",
  map = "Thunderdome",
  result = "Win",
  score = 85
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  
  // Determine colors based on game result
  const resultColor = result === "Win" ? "#22c55e" : "#ef4444"; // green-500 or red-500
  const getScoreColor = () => {
    if (score >= 80) return "#22c55e"; // green-500
    if (score >= 60) return "#eab308"; // yellow-500
    return "#ef4444"; // red-500
  };
  
  return (
    <View style={styles.card}>
      {/* Header with game mode and result badge */}
      <View style={styles.header}>
        <View style={styles.gameModeContainer}>
          <Ionicons name="game-controller" size={20} color="#4b5563" />
          <Text style={styles.gameModeText}>{gameMode}</Text>
        </View>
        <View style={[styles.resultBadge, { backgroundColor: resultColor }]}>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      </View>
      
      {/* Main card content */}
      <View style={styles.content}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={16} color="#4b5563" />
          <Text style={styles.infoText}>{date}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color="#4b5563" />
          <Text style={styles.infoText}>{map}</Text>
        </View>
        
        <View style={styles.scoreContainer}>
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreLabel}>Performance Score</Text>
            <Text style={[styles.scoreValue, { color: getScoreColor() }]}>{score}</Text>
          </View>
          
          {/* Score visualization */}
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBar, 
                { 
                  backgroundColor: getScoreColor(),
                  width: `${score}%` 
                }
              ]} 
            />
          </View>
        </View>
        
        {/* Expandable section */}
        <TouchableOpacity 
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.detailsButton}
        >
          <Text style={styles.detailsButtonText}>
            {isExpanded ? 'Hide details' : 'Show details'}
          </Text>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.expandedDetails}>
            <View style={styles.statsGrid}>
              <Text style={styles.statsLabel}>Kills</Text>
              <Text style={styles.statsValue}>12</Text>
              
              <Text style={styles.statsLabel}>Deaths</Text>
              <Text style={styles.statsValue}>3</Text>
              
              <Text style={styles.statsLabel}>Assists</Text>
              <Text style={styles.statsValue}>7</Text>
              
              <Text style={styles.statsLabel}>Damage</Text>
              <Text style={styles.statsValue}>1875</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  gameModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gameModeText: {
    fontWeight: '600',
    fontSize: 18,
    color: '#1f2937',
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  resultText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
  },
  scoreContainer: {
    marginTop: 16,
  },
  scoreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#374151',
    fontWeight: '500',
  },
  scoreValue: {
    fontWeight: '700',
    fontSize: 18,
  },
  progressBarBackground: {
    height: 8,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 9999,
  },
  detailsButton: {
    marginTop: 16,
  },
  detailsButtonText: {
    color: '#3b82f6',
    fontSize: 14,
  },
  expandedDetails: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsLabel: {
    width: '50%',
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  statsValue: {
    width: '50%',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginBottom: 8,
  },
});

export default GameCard;