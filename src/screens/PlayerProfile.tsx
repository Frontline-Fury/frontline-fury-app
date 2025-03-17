import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';
import DropDownPicker from 'react-native-dropdown-picker';
import StatContainer from "../components/StatContainer";


type PlayerProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PlayerProfile'>;
};

const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'TDM', value: 'Team Death Match' },
    { label: 'CTF', value: 'Capture The Flag' },
    { label: 'SPIKE', value: 'Spike Rush' },
  ]);

  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={styles.container}>

      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Player Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Player Name Tag */}
      <View style={styles.nameTag}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>S2AT</Text>
          <Text style={{ fontSize: 16, color: '#777' }}>#6969</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/Ruby_converted-removebg-preview.png')}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
          <Text style={{ fontSize: 12, color: '#777' }}>Ruby I</Text>
        </View>
      </View>
      <FlatList
        style={{ height: 10200 }}
        data={[{}]} // Dummy data to render the component once
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} // Increases scrollable height
        renderItem={() => (
          <View>
            {/* Your Stats Container and other contents */}
            <View style={styles.statsContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="All"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
              />

              {/* Tabs for Filtering */}
              <View style={styles.tabsContainer}>
                {['All', 'Ranked', 'Casual'].map((tab) => (
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

              {/* Common Stats */}
              <View style={styles.CommonStats}>
                <View style={styles.cont1}>
                  <View style={styles.cont1A}>
                    <Text style={styles.statstext}>Win</Text>
                  </View>
                  <View style={styles.cont1B}>
                    <Text style={styles.statstext}>Top Ten's</Text>
                  </View>
                </View>

                <View style={styles.cont2}>
                  <View style={styles.cont2A}>
                    <Text style={styles.statstext}>Win%</Text>
                  </View>
                  <View style={styles.cont2B}>
                    <Text style={styles.statstext}>Games played</Text>
                    <Text style={styles.statstext1}>K/D</Text>
                  </View>
                </View>

                <View style={styles.cont3}>
                  <View style={styles.cont3A}>
                    <Text style={styles.statstext}>Kil</Text>
                  </View>
                  <View style={styles.cont3B}>
                    <Text style={styles.statstext}>Best Rank</Text>
                  </View>
                </View>

                <View style={{ width: "100%", height: "50%" }}>
                  <StatContainer />
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

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
    width: "95%",
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: "100 %",
    marginTop: 16,

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

export default PlayerProfileScreen;
