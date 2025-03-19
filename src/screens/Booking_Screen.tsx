import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../main/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
type BookingProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Booking'>;
};
const Booking: React.FC<BookingProps> = () => {

  const [activeTab, setActiveTab] = useState('All');

  return (
    // Booking Screen
    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
      <View>
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
        <View style={{width:"100%", backgroundColor: '#00000050', height: 200, marginTop: 16, borderColor: "#000", borderWidth: 1}}>
          <Text>Image of Game mode with the game info in carousel!</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginTop: 40,
    height: 60,
    backgroundColor: '#FF6600',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  nameTag: {
    height: 80,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderColor: '#FF6600',
    borderBottomWidth: 1,
  },
  backText: {
    height: 40,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 16,
    width: "100%",
    height: "100%",
    backgroundColor: 'white',
    alignItems: 'center',
  },
  dropdown: {
    width: "100%",
    backgroundColor: '#fafafa',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownContainer: {
    width: "100%",
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  CommonStats: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    width: "100%",
    height: "50%",
    marginTop: 16,
    backgroundColor: '#00000050',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
  },
  cont1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  cont1A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont1B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  cont2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  cont2A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont2B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  cont3: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "90%",
    height: "30%",
    marginVertical: 5,
  },
  cont3A: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
  },
  cont3B: {
    alignItems: 'center',
    width: "50%",
    height: "90%",
    borderLeftColor: '#000',
    borderLeftWidth: 1,
  },
  statstext: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'popins',
    fontWeight: 'bold',
  },
  statstext1: {
    marginTop: 50,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'popins',
    fontWeight: 'bold',
  },

});
export default Booking;