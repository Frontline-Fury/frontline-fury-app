import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  
  SafeAreaView,
} from 'react-native';
import styles from '../../styles/BattalionStyle'; // Update path as needed
type MemberRole = 'Commander' | 'Lieutenant' | 'Sergeant' | 'Soldier';

interface Member {
  id: string;
  name: string;
  role: MemberRole;
  avatarUrl: string;
}

interface Squad {
  id: string;
  name: string;
  membersCount: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
}

const dummyMembers: Member[] = [
  {
    id: '1',
    name: 'John "Eagle" Smith',
    role: 'Commander',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Sarah "Hawk" Johnson',
    role: 'Lieutenant',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Mike "Razor" Lee',
    role: 'Sergeant',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Anna "Ghost" Kim',
    role: 'Soldier',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
  },
];

const dummySquads: Squad[] = [
  { id: 's1', name: 'Alpha Squad', membersCount: 5 },
  { id: 's2', name: 'Bravo Squad', membersCount: 4 },
  { id: 's3', name: 'Charlie Squad', membersCount: 6 },
];

const dummyEvents: Event[] = [
  { id: 'e1', title: 'Capture the Flag', date: '2025-04-20' },
  { id: 'e2', title: 'Night Ops Practice', date: '2025-04-25' },
];

type Tab = 'Members' | 'Squads' | 'Events' | 'Chat';

export const BattalionScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>('Members');

  // Dummy battalion info
  const battalion = {
    name: '1st Airborne Rangers',
    emblemUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/US_Army_82nd_Airborne_Division_SSI.svg/1200px-US_Army_82nd_Airborne_Division_SSI.svg.png',
    motto: 'Swift, Silent, Deadly',
    level: 5,
    currentXP: 3500,
    xpForNextLevel: 5000,
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Members':
        return (
          <FlatList
            data={dummyMembers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.memberRow}>
                <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.memberName}>{item.name}</Text>
                  <Text style={styles.memberRole}>{item.role}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        );
      case 'Squads':
        return (
          <FlatList
            data={dummySquads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.squadRow}>
                <Text style={styles.squadName}>{item.name}</Text>
                <Text style={styles.squadCount}>{item.membersCount} members</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        );
      case 'Events':
        return (
          <FlatList
            data={dummyEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventRow}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        );
      case 'Chat':
        return (
          <View style={styles.chatPlaceholder}>
            <Text style={{ color: '#888', fontStyle: 'italic' }}>
              Chat feature coming soon...
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  const progressPercent = (battalion.currentXP / battalion.xpForNextLevel) * 100;

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.headerSection}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: battalion.emblemUrl }} style={styles.emblem} />
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.battalionName}>{battalion.name}</Text>
            <Text style={styles.motto}>{battalion.motto}</Text>
          </View>
        </View>

        {/* XP Bar */}
        <View style={styles.xpBarContainer}>
          <View style={[styles.xpBarFill, { width: `${progressPercent}%` }]} />
          <Text style={styles.xpText}>
            Level {battalion.level} — {battalion.currentXP} / {battalion.xpForNextLevel} XP
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['Members', 'Squads', 'Events', 'Chat'] as Tab[]).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content - Takes remaining space */}
      <View style={styles.tabContent}>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
};



export default BattalionScreen;