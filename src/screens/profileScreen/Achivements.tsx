import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigaitonBar/BottomTabNavigation'; // Update path as needed
import Achievement from '../../components/Achivement'; // Update path as needed

type AchivementScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'GameStats'>;
};

const AchivementScreen: React.FC<AchivementScreenProps> = ({ navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achivement</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Achievement 
          name="First Victory"
          description="Win your first match"
          iconName="trophy"
          progress={100}
          total={1}
          current={1}
          isCompleted={true}
        />
        
        <Achievement 
          name="Marksman"
          description="Get 500 headshots"
          iconName="flame"
          progress={68}
          total={500}
          current={340}
        />
        
        <Achievement 
          name="Map Explorer"
          description="Play on all available maps"
          iconName="map"
          progress={30}
          total={10}
          current={3}
        />
        
        {/* Example with custom image */}
        <Achievement 
          name="Legendary Badge"
          description="Reach legend status"
          customIcon={require('../../../assets/ff.png')}
          progress={10}
          total={1000}
          current={100}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#1E2329',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
});

export default AchivementScreen;