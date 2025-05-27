import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from '../components/Carousel_Event';
import CarouselMap from '../components/Carousel_Map';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../main/types";
// Screen dimensions
const { width } = Dimensions.get('window');

// Types Definition
type SectionItem = {
  type: 'weeklyEvent' | 'performance' | 'mapRotation' | 'bookingSlot';
};

type HomeScreenProps = { navigation:StackNavigationProp<RootStackParamList, 'Home'>;

 }; 
type PerformanceData = {
  name: string;
  image: any;
  achievements: string[];
  rank?: number;
};

// Define BookingSlot type
type BookingSlot = {
  id: number;
  gameName: string;
  dateTime: string;
  remainingSeatsTeam1: number;
  remainingSeatsTeam2: number;
  totalSeatsTeam1: number;
  totalSeatsTeam2: number;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  // Sections for FlatList
  const sections: SectionItem[] = [
    { type: 'weeklyEvent' },
    { type: 'performance' },
    { type: 'mapRotation' },
    { type: 'bookingSlot' }
  ];
 
  // State for active tab
  const [activeTab, setActiveTab] = useState<'Team' | 'Individual'>('Team');

  // Mock booking slots data
  const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([
    {
      id: 1,
      gameName: "Spike Rush",
      dateTime: "2024-03-30 14:00",
      remainingSeatsTeam1: 2,
      remainingSeatsTeam2: 3,
      totalSeatsTeam1: 10,
      totalSeatsTeam2: 10
    },
    {
      id: 2,
      gameName: "Team Death Match",
      dateTime: "2024-03-31 16:00",
      remainingSeatsTeam1: 2,
      remainingSeatsTeam2: 10,
      totalSeatsTeam1: 10,
      totalSeatsTeam2: 10
    },
    {
      id: 3,
      gameName: "Capture the Flag",
      dateTime: "2024-04-01 10:00",
      remainingSeatsTeam1: 8,
      remainingSeatsTeam2: 9,
      totalSeatsTeam1: 10,
      totalSeatsTeam2: 10
    }
  ]);

  // Mock data for performance with added rank
  const teamPerformanceData: PerformanceData[] = [
    {
      name: "Apex Legends Team",
      image: require('../../assets/a1.jpeg'),
      rank: 1,
      achievements: [
        "Weekly Tournament Champions",
        "Highest Team Kill Rate",
        "Strategic Gameplay Award"
      ]
    }
  ];

  const individualPerformanceData: PerformanceData[] = [
    {
      name: "John Doe",
      image: require('../../assets/a2.jpeg'),
      rank: 1,
      achievements: [
        "Most Kills in a Single Match",
        "Highest Accuracy Rate",
        "MVP of the Week"
      ]
    }
  ];

  // Sort booking slots by total remaining seats (descending)
  const sortedBookingSlots = [...bookingSlots].sort((a, b) => {
    const remainingA = a.remainingSeatsTeam1 + a.remainingSeatsTeam2;
    const remainingB = b.remainingSeatsTeam1 + b.remainingSeatsTeam2;
    return remainingB - remainingA;
  });

  // Memoized performance content rendering
  const renderPerformanceContent = useCallback(() => {
    const performanceData = activeTab === 'Team' 
      ? teamPerformanceData 
      : individualPerformanceData;

    return performanceData.map((item, index) => (
      <View key={index} style={styles.performanceCard}>
        <View style={styles.performanceImageContainer}>
          <Image 
            source={item.image} 
            style={styles.performanceImage} 
            resizeMode="cover"
          />
          {item.rank && (
            <View style={styles.rankBadge}>
              <Text style={styles.rankText}>#{item.rank}</Text>
            </View>
          )}
        </View>
        <View style={styles.performanceDetailsContainer}>
          <Text style={styles.performanceName}>{item.name}</Text>
          <View style={styles.achievementsContainer}>
            {item.achievements.map((achievement, achIndex) => (
              <View key={achIndex} style={styles.achievementItem}>
                <Text style={styles.achievementText}>
                  ✓ {achievement}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    ));
  }, [activeTab]);

  // Render booking slots
  const renderBookingSlots = () => {
    return sortedBookingSlots.map((slot) => (
      <TouchableOpacity 
        key={slot.id} 
        style={styles.bookingSlotCard}
        onPress={() => navigation.navigate('Booking')}
      >
        <View style={styles.bookingSlotHeader}>
          <Text style={styles.bookingSlotName}>{slot.gameName}</Text>
          <Text style={styles.bookingSlotDateTime}>{slot.dateTime}</Text>
        </View>
        <View style={styles.teamSeatsContainer}>
          <View style={styles.teamSeatBlock}>
            <Text style={styles.teamLabel}>Team 1</Text>
            <Text style={styles.seatText}>
              {slot.remainingSeatsTeam1}/{slot.totalSeatsTeam1} Seats
            </Text>
            <View 
              style={[
                styles.seatProgressBar, 
                { 
                  width: `${(slot.remainingSeatsTeam1 / slot.totalSeatsTeam1) * 100}%`,
                  backgroundColor: slot.remainingSeatsTeam1 < 3 ? '#E74C3C' : '#2ECC71'
                }
              ]} 
            />
          </View>
          <View style={styles.teamSeatBlock}>
            <Text style={styles.teamLabel}>Team 2</Text>
            <Text style={styles.seatText}>
              {slot.remainingSeatsTeam2}/{slot.totalSeatsTeam2} Seats
            </Text>
            <View 
              style={[
                styles.seatProgressBar, 
                { 
                  width: `${(slot.remainingSeatsTeam2 / slot.totalSeatsTeam2) * 100}%`,
                  backgroundColor: slot.remainingSeatsTeam2 < 3 ? '#E74C3C' : '#2ECC71'
                }
              ]} 
            />
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  // Header Component with Gradient
  const HeaderComponent = () => (
    <LinearGradient
      colors={['#2C5E4F', '#3A7CA5']}
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
          <Text style={styles.headerTitlePrimary}>S2AT</Text>
          <Text style={styles.headerTitleSecondary}>sochta hun?</Text>
        </View>
      </View>
    </LinearGradient>
  );

  // Render section for FlatList
  const renderSection = ({ item }: { item: SectionItem }) => {
    switch (item.type) {
      case 'weeklyEvent':
        return (
          <View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Weekly Event</Text>
            </View>
            <Carousel />
          </View>
        );
      
      case 'performance':
        return (
          <View style={styles.performanceSection}>
            <View style={styles.tabsContainer}>
              {['Team', 'Individual'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tabButton,
                    activeTab === tab && styles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab as 'Team' | 'Individual')}
                >
                  <Text style={[
                    styles.tabText, 
                    activeTab === tab && styles.activeTabText
                  ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.performanceContentContainer}>
              {renderPerformanceContent()}
            </View>
          </View>
        );
      
      case 'mapRotation':
        return (
          <View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Map Rotation</Text>
          </View>
            
          <View style={styles.carouselContainer}>
              <CarouselMap />
          </View>
          </View>  
        );
      
      case 'bookingSlot':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Booking Slots</Text>
            {renderBookingSlots()}
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={HeaderComponent}
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item, index) => `section-${index}`}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    backgroundColor: '#1E2329', // Dark background from palette
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
    color: '#FF6B35', // Bright Accent Orange
  },
  headerTitleSecondary: {
    fontSize: 16,
    color: '#E0E0E0', // Light text for dark mode
  },
  sectionContainer: {
    width: "95%",
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#4A5563', // Gunmetal Gray
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E0E0E0', // Light text
  },
  performanceSection: {
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#3A7CA5', // Cool Blue
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
    backgroundColor: '#FF6B35', // Bright Accent Orange
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
  performanceContentContainer: {
    width: "95%",
    backgroundColor: '#4A5563', // Gunmetal Gray
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#2C5E4F', // Tactical Green
    borderRadius: 10,
    padding: 15,
  },
  performanceImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  performanceImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B35', // Bright Accent Orange
  },
  rankBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF6B35', // Bright Accent Orange
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  performanceDetailsContainer: {
    flex: 1,
  },
  performanceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E0E0E0', // Light text
  },
  achievementsContainer: {
    marginLeft: 5,
  },
  achievementItem: {
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 14,
    color: '#D2B48C', // Sand Tan for achievements
  },
  carouselContainer: {
    width: '100%', 
    height: 300, 
    alignItems: 'center',
  },
  // Booking Slots Styles
  bookingSlotCard: {
    backgroundColor: '#2C5E4F', // Tactical Green
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  bookingSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingSlotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  bookingSlotDateTime: {
    fontSize: 14,
    color: '#FF6B35', // Bright Accent Orange
  },
  teamSeatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamSeatBlock: {
    width: '48%',
  },
  teamLabel: {
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 5,
  },
  seatText: {
    color: '#D2B48C', // Sand Tan
    fontSize: 14,
    marginBottom: 5,
  },
  seatProgressBar: {
    height: 5,
    borderRadius: 3,
  },
});

export default HomeScreen;