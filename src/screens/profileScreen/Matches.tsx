import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigaitonBar/BottomTabNavigation'; // Update path as needed
import GameCard from '../../components/GameCard';

type MatchesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GameStats'>;
};

const MatchesScreen: React.FC<MatchesScreenProps> = ({ navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matches</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <GameCard 
        gameMode="Capture the Flag"
        date="April 16, 2025"
        map="Highlands"
        result="Win"
        score={92}
      />
      <GameCard 
        gameMode="Deathmatch"
        date="April 15, 2025"
        map="Desert Oasis"
        result="Loss"
        score={45}
      />
      <GameCard 
        gameMode="Team Deathmatch"
        date="April 14, 2025"
        map="Urban Warfare"
        result="Win"
        score={78}
      />
      <GameCard 
        gameMode="Battle Royale"
        date="April 13, 2025"
        map="Thunderdome"
        result="Win"
        score={85}
      />
      <GameCard 
        gameMode="Capture the Flag"
        date="April 12, 2025"
        map="Forest Arena"
        result="Loss"
        score={60}
      />
      <GameCard
        gameMode="Deathmatch"
        date="April 11, 2025"
        map="Mountain Pass"
        result="Win"
        score={88}
      />
        
      </ScrollView>
    </View>
  );
};
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#1E2329',
      padding: 16,
    },
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 16,
    },
    backButton:{
      padding: 8,
    },
    headerTitle:{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    scrollContainer:{
      paddingBottom: 16,
      
    },
    matchItem:{
      backgroundColor: '#2C2F33',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      color: '#fff',
    },
  });



export default MatchesScreen;