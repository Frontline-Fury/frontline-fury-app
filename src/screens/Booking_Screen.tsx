import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { RootStackParamList } from '../main/types';
import { StackScreenProps } from '@react-navigation/stack';

// Update the type to use StackScreenProps
type BookingScreenProps = StackScreenProps<RootStackParamList, 'Booking'>;

const Booking: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  // Extract game details from route params
  const { gameId, gameName } = route.params || {};

  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#1E2329' }}>
      <View style={{ width: '90%' }}>
        {/* Display game name if available */}
        {gameName && (
          <Text style={styles.gameNameText}>
            {gameName}
          </Text>
        )}

        {/* Game Mode Tabs */}
        <View style={styles.tabsContainer}>
          {['Spike Rush', 'TDM', 'Hostage'].map((tab) => (
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

        {/* Game Mode Preview */}
        <View style={styles.gamePreviewContainer}>
          <Text style={styles.previewText}>
            {gameId 
              ? `Game Mode Preview for Game ID: ${gameId}` 
              : 'Image of Game mode with the game info in carousel!'}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  ...{
    // Spread the existing styles
    ...StyleSheet.create({
      gameNameText: {
        fontSize: 24,
        color: '#E0E0E0',
        fontWeight: 'bold',
        marginTop: 16,
        textAlign: 'center',
      },
      gamePreviewContainer: {
        width: '100%', 
        backgroundColor: '#00000050', 
        height: 200, 
        marginTop: 16, 
        borderColor: "#FF6B35", 
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      previewText: {
        color: '#E0E0E0',
        fontSize: 16,
      },
      tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        marginTop: 16,
        borderColor: "#FF6B35",
        borderWidth: 1,
      },
      tabButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4A5563',
      },
      activeTab: {
        backgroundColor: '#FF6B35',
      },
      tabText: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
      },
      activeTabText: {
        color: 'white',
        fontWeight: 'bold',
      },
    })
  }
});

export default Booking;