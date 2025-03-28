import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import Carousel from '../components/Carousel_Event';
import CarouselMap from '../components/Carousel_Map';

// Types Definition
type SectionItem = {
  type: 'weeklyEvent' | 'performance' | 'mapRotation' | 'bookingSlot';
};

type PerformanceData = {
  name: string;
  image: any;
  achievements: string[];
};

const HomeScreen: React.FC = () => {
  // Sections for FlatList
  const sections: SectionItem[] = [
    { type: 'weeklyEvent' },
    { type: 'performance' },
    { type: 'mapRotation' },
    { type: 'bookingSlot' }
  ];
 
  // State for active tab
  const [activeTab, setActiveTab] = useState<'Team' | 'Individual'>('Team');

  // Mock data for performance
  const teamPerformanceData: PerformanceData[] = [
    {
      name: "Apex Legends Team",
      image: require('../../assets/a1.jpeg'), // Replace with actual image
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
      image: require('../../assets/a2.jpeg'), // Replace with actual image
      achievements: [
        "Most Kills in a Single Match",
        "Highest Accuracy Rate",
        "MVP of the Week"
      ]
    }
  ];

  // Render performance content based on active tab
  const renderPerformanceContent = () => {
    const performanceData = activeTab === 'Team' 
      ? teamPerformanceData 
      : individualPerformanceData;

    return performanceData.map((item, index) => (
      <View key={index} style={styles.performanceItemContainer}>
        <Image 
          source={item.image} 
          style={styles.performanceImage} 
          resizeMode="cover"
        />
        <View style={styles.performanceDetailsContainer}>
          <Text style={styles.performanceName}>{item.name}</Text>
          <View style={styles.achievementsContainer}>
            {item.achievements.map((achievement, achIndex) => (
              <Text key={achIndex} style={styles.achievementText}>
                • {achievement}
              </Text>
            ))}
          </View>
        </View>
      </View>
    ));
  };

  // Header Component
  const HeaderComponent = () => (
    <View style={styles.container}>
      <View>
        <Image source={require('../../assets/ff.png')} style={styles.image} />
      </View>
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={styles.text}>S2AT</Text>
      </View>
      <View style={{ justifyContent: 'center', alignContent: 'center' }}>
        <Text style={styles.text}>sochta hun?</Text>
      </View>
    </View>
  );

  // Render section for FlatList
  const renderSection = ({ item }: { item: SectionItem }) => {
    switch (item.type) {
      case 'weeklyEvent':
        return (
          <View style={styles.baseContainer}>
            <Text style={{ fontFamily: "Poppins", fontSize: 24 }}>Weekly Event</Text>
            <Carousel />
          </View>
        );
      
      case 'performance':
        return (
          <View style={{flexDirection:"column", alignItems:"center"}}>
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
          <View style={styles.baseContainer}>
            <Text>This Container Hold the Data of Map Rotation</Text>
            <View style={{width: "100%", height: 200, alignItems:"center"}}>
                <CarouselMap />
            </View>
          </View>
        );
      
      case 'bookingSlot':
        return (
          <View style={styles.baseContainer}>
           
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <FlatList
      ListHeaderComponent={HeaderComponent}
      data={sections}
      renderItem={renderSection}
      keyExtractor={(item, index) => `section-${index}`}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fe680780',
  },
  text: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'poppins',
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  baseContainer: {
    width: "95%",
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#fe680780',
    borderRadius: 6,
    borderWidth: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "100%",
    marginTop: 16,
    borderColor: "#000",
    borderWidth: 1,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
  },
  activeTab: {
    backgroundColor: '#FF6600',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  performanceContentContainer: {
    width: "95%", 
    minHeight: 250,
    borderColor: "#000", 
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
  performanceItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  performanceImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  performanceDetailsContainer: {
    flex: 1,
  },
  performanceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  achievementsContainer: {
    marginLeft: 5,
  },
  achievementText: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default HomeScreen;