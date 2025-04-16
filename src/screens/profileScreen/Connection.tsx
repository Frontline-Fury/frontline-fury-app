import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Interface for friend data
interface FriendItem {
  id: string;
  name: string;
  bio: string;
  avatar: any; // Image source
  isAdded?: boolean;
}

// Tabs for different friend categories
type FriendTab = 'game' | 'twitter' | 'contacts';
const FriendsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<FriendTab>('game');
  const [friendsList, setFriendsList] = useState<FriendItem[]>([
    {
      id: '1',
      name: 'Asana islam chua',
      bio: 'Love music, love world',
      avatar: require('../../../assets/ff.png'),
      isAdded: false
    },
    {
      id: '2',
      name: 'Alamgir Hosian',
      bio: 'Love music, love world',
      avatar: require('../../../assets/ff.png'),
      isAdded: true
    },
    {
      id: '3',
      name: 'Bablu khan bablu',
      bio: 'Love music, love world',
      avatar: require('../../../assets/ff.png'),
      isAdded: false
    },
    {
      id: '4',
      name: 'Shahidul Islam Shishir',
      bio: 'Love music, love world',
      avatar: require('../../../assets/ff.png'),
      isAdded: false
    },
    {
      id: '5',
      name: 'Shahidul Islam Shishir',
      bio: 'Love music, love world',
      avatar: require('../../../assets/ff.png'),
      isAdded: true
    },
  ]);
  
  // Function to handle adding/removing a friend
  const handleAddFriend = (id: string) => {
    setFriendsList(currentList => 
      currentList.map(friend => 
        friend.id === id ? { ...friend, isAdded: !friend.isAdded } : friend
      )
    );
  };
  
  // Alphabetical index for the list
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Group friends by first letter
  const groupedFriends = friendsList.reduce((acc, friend) => {
    const firstLetter = friend.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(friend);
    return acc;
  }, {} as { [key: string]: FriendItem[] });
  
  // Sort alphabetically
  const sortedKeys = Object.keys(groupedFriends).sort();
  
  // Render friend item
  const renderFriendItem = ({ item }: { item: FriendItem }) => (
    <View style={styles.friendItem}>
      <View style={styles.friendInfo}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.friendName}>{item.name}</Text>
          <Text style={styles.friendBio}>{item.bio}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={[
          styles.addButton, 
          item.isAdded ? styles.addedButton : styles.addButtonActive
        ]} 
        onPress={() => handleAddFriend(item.id)}
      >
        <Text style={[
          styles.addButtonText,
          item.isAdded ? styles.addedButtonText : styles.addButtonActiveText
        ]}>
          {item.isAdded ? 'Added' : 'Add'}
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  // Render the alphabet index at the side
  const renderAlphabetIndex = () => (
    <View style={styles.alphabetContainer}>
      {alphabet.map(letter => (
        <Text 
          key={letter} 
          style={[
            styles.alphabetLetter,
            sortedKeys.includes(letter) ? styles.activeAlphabetLetter : {}
          ]}
        >
          {letter}
        </Text>
      ))}
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Your Friends</Text>
          <Text style={styles.headerSubtitle}>256 Friends</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image 
            source={require('../../../assets/ff.png')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'game' ? styles.activeTab : {}]} 
          onPress={() => setActiveTab('game')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'game' ? styles.activeTabText : {}
          ]}>
            Game friends
          </Text>
          {activeTab === 'game' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'twitter' ? styles.activeTab : {}]} 
          onPress={() => setActiveTab('twitter')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'twitter' ? styles.activeTabText : {}
          ]}>
            Twitter followers
          </Text>
          {activeTab === 'twitter' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contacts' ? styles.activeTab : {}]} 
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'contacts' ? styles.activeTabText : {}
          ]}>
            Contacts
          </Text>
          {activeTab === 'contacts' && <View style={styles.activeTabIndicator} />}
        </TouchableOpacity>
      </View>
      
      {/* Search/Filter text */}
      <Text style={styles.filterText}>Choose your friend</Text>
      
      {/* Friend list */}
      <View style={styles.listContainer}>
        <ScrollView>
          {sortedKeys.map(key => (
            <View key={key}>
              <View style={styles.letterHeader}>
                <Text style={styles.letterText}>{key}</Text>
              </View>
              {groupedFriends[key].map(friend => (
                <View key={friend.id}>
                  {renderFriendItem({ item: friend })}
                </View>
              ))}
            </View>
          ))}
          
          {/* Spacer for bottom button */}
          <View style={{ height: 100 }} />
        </ScrollView>
        
        {/* Side alphabet index */}
        {renderAlphabetIndex()}
      </View>
      
      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 15,
    marginRight: 20,
    position: 'relative',
  },
  activeTab: {},
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: '#333',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#5065CB',
    borderRadius: 3,
  },
  filterText: {
    fontSize: 16,
    color: '#777',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  listContainer: {
    flex: 1,
    position: 'relative',
  },
  letterHeader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  letterText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 15,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  friendBio: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  addButtonActive: {
    backgroundColor: '#5065CB',
    borderColor: '#5065CB',
  },
  addedButton: {
    backgroundColor: 'transparent',
    borderColor: '#e0e0e0',
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  addButtonActiveText: {
    color: 'white',
  },
  addedButtonText: {
    color: '#888',
  },
  alphabetContainer: {
    position: 'absolute',
    right: 5,
    top: 10,
    bottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  alphabetLetter: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
  activeAlphabetLetter: {
    color: '#5065CB',
    fontWeight: '600',
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#5065CB',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    width: '90%',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default FriendsScreen