import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const CommunityScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Experience');
  
  const experiencePosts = [
    {
      id: '1',
      username: 'TechGamer',
      avatar: 'https://ui-avatars.com/api/?name=TG&background=random',
      content: 'Just achieved a 15-game win streak in ranked matches! The new strategy of flanking from the sides is working perfectly.',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      id: '2',
      username: 'ProSniper',
      avatar: 'https://ui-avatars.com/api/?name=PS&background=random',
      content: 'Finally mastered the tricky sniper spots on the new map. Here\'s a quick guide on where to position yourself for maximum visibility with minimum exposure.',
      timestamp: '5 hours ago',
      likes: 56,
      comments: 19,
      image: null
    },
    {
      id: '3',
      username: 'GameMaster',
      avatar: 'https://ui-avatars.com/api/?name=GM&background=random',
      content: 'The latest update has completely changed how support characters work. I\'ve updated my builds to maximize healing efficiency.',
      timestamp: '1 day ago',
      likes: 103,
      comments: 42,
      image: 'https://via.placeholder.com/300x200'
    }
  ];
  
  const teamUpRequests = [
    {
      id: '1',
      username: 'NightOwl',
      avatar: 'https://ui-avatars.com/api/?name=NO&background=random',
      rank: 'Diamond',
      content: 'Looking for a squad to join for weekend tournaments. I main support characters and have a 68% win rate.',
      timestamp: '1 hour ago',
      position: 'Support',
      playTime: 'Evenings & Weekends'
    },
    {
      id: '2',
      username: 'SharpShooter',
      avatar: 'https://ui-avatars.com/api/?name=SS&background=random',
      rank: 'Platinum',
      content: 'Need one more player for our ranked team. Must be able to play offensive roles and communicate well.',
      timestamp: '3 hours ago',
      position: 'Offense',
      playTime: 'Daily, 8PM-11PM'
    },
    {
      id: '3',
      username: 'TacticalWizard',
      avatar: 'https://ui-avatars.com/api/?name=TW&background=random',
      rank: 'Gold',
      content: 'New player looking to improve and join a clan. I learn quickly and take direction well.',
      timestamp: '6 hours ago',
      position: 'Flexible',
      playTime: 'Weekends'
    }
  ];
  
  const clans = [
    {
      id: '1',
      name: 'Shadow Wolves',
      logo: 'https://ui-avatars.com/api/?name=SW&background=random',
      members: 48,
      description: 'Competitive clan focusing on tournament play and strategic teamwork.',
      requirements: 'Diamond+ rank, 3+ hours daily'
    },
    {
      id: '2',
      name: 'Phoenix Rising',
      logo: 'https://ui-avatars.com/api/?name=PR&background=random',
      members: 36,
      description: 'Casual clan with a focus on having fun while improving gameplay skills.',
      requirements: 'Open to all ranks'
    },
    {
      id: '3',
      name: 'Elite Guardians',
      logo: 'https://ui-avatars.com/api/?name=EG&background=random',
      members: 25,
      description: 'Top-tier competitive clan with professional coaching and weekly practice sessions.',
      requirements: 'Masters+ rank, tryout required'
    }
  ];
  
  const tournaments = [
    {
      id: '1',
      name: 'Weekend Warrior Cup',
      organizer: 'GameMaster',
      schedule: 'This Saturday, 3PM',
      prize: '$50 Gift Card',
      participants: '16/32',
      description: 'Casual tournament for players of all skill levels.',
      image: 'https://via.placeholder.com/300x100'
    },
    {
      id: '2',
      name: 'Pro League Qualifier',
      organizer: 'EliteGaming',
      schedule: 'Next Sunday, 1PM',
      prize: '$200 + Qualification Points',
      participants: '24/64',
      description: 'High-level competition with official ranking points.',
      image: 'https://via.placeholder.com/300x100'
    },
    {
      id: '3',
      name: 'Midnight Madness',
      organizer: 'NightOwl',
      schedule: 'Friday Night, 10PM',
      prize: 'In-game Currency',
      participants: '8/16',
      description: 'Late night tournament with unique ruleset.',
      image: 'https://via.placeholder.com/300x100'
    }
  ];
  
  const celebrations = [
    {
      id: '1',
      username: 'VictoryRoyal',
      avatar: 'https://ui-avatars.com/api/?name=VR&background=random',
      achievement: 'Tournament Champion',
      content: 'Won the Regional Finals after months of practice!',
      timestamp: '1 day ago',
      congrats: 128,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      id: '2',
      username: 'LevelUpQueen',
      avatar: 'https://ui-avatars.com/api/?name=LQ&background=random',
      achievement: 'Max Level Achieved',
      content: 'Finally reached level 100 after 6 months of grinding!',
      timestamp: '3 days ago',
      congrats: 95,
      image: null
    },
    {
      id: '3',
      username: 'SkillMaster',
      avatar: 'https://ui-avatars.com/api/?name=SM&background=random',
      achievement: 'Perfect Game',
      content: 'Achieved a perfect score in ranked play - 30 kills, 0 deaths!',
      timestamp: '1 week ago',
      congrats: 216,
      image: 'https://via.placeholder.com/300x150'
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Experience':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={[styles.card, styles.createPostButton]} onPress={() => alert('Create Experience Post')}>
              <Text style={styles.createPostText}>Share Your Experience</Text>
            </TouchableOpacity>
            
            {experiencePosts.map(post => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: post.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.username}>{post.username}</Text>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                
                {post.image && (
                  <Image source={{ uri: post.image }} style={styles.postImage} />
                )}
                
                <View style={styles.postFooter}>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>👍 {post.likes}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>💬 {post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.footerButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'Team-Up':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={[styles.card, styles.createPostButton]} onPress={() => alert('Create Team-Up Request')}>
              <Text style={styles.createPostText}>Post Team-Up Request</Text>
            </TouchableOpacity>
            
            {teamUpRequests.map(request => (
              <View key={request.id} style={styles.teamUpCard}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: request.avatar }} style={styles.avatar} />
                  <View style={styles.userInfo}>
                    <Text style={styles.username}>{request.username}</Text>
                    <View style={styles.rankContainer}>
                      <Text style={styles.rankText}>{request.rank}</Text>
                    </View>
                  </View>
                  <Text style={styles.timestamp}>{request.timestamp}</Text>
                </View>
                
                <Text style={styles.postContent}>{request.content}</Text>
                
                <View style={styles.teamDetails}>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Position:</Text>
                    <Text style={styles.detailValue}>{request.position}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Play Time:</Text>
                    <Text style={styles.detailValue}>{request.playTime}</Text>
                  </View>
                </View>
                
                <TouchableOpacity style={styles.contactButton}>
                  <Text style={styles.contactButtonText}>Contact Player</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
        
      case 'Clans':
        return (
          <View style={styles.tabContent}>
            <View style={styles.clanButtons}>
              <TouchableOpacity style={styles.createPostButton} onPress={() => alert('Create Clan')}>
                <Text style={styles.createPostText}>Create a Clan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.createPostButton, styles.secondaryButton]} onPress={() => alert('Browse Clans')}>
                <Text style={styles.secondaryButtonText}>Browse All Clans</Text>
              </TouchableOpacity>
            </View>
            
            {clans.map(clan => (
              <View key={clan.id} style={styles.clanCard}>
                <View style={styles.clanHeader}>
                  <Image source={{ uri: clan.logo }} style={styles.clanLogo} />
                  <View>
                    <Text style={styles.clanName}>{clan.name}</Text>
                    <Text style={styles.clanMembers}>{clan.members} members</Text>
                  </View>
                </View>
                
                <Text style={styles.clanDescription}>{clan.description}</Text>
                
                <View style={styles.clanRequirements}>
                  <Text style={styles.requirementsLabel}>Requirements:</Text>
                  <Text style={styles.requirementsText}>{clan.requirements}</Text>
                </View>
                
                <View style={styles.clanButtonRow}>
                  <TouchableOpacity style={styles.clanActionButton}>
                    <Text style={styles.clanActionButtonText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.clanActionButton, styles.joinButton]}>
                    <Text style={styles.joinButtonText}>Request to Join</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'Tournaments':
        return (
          <View style={styles.tabContent}>
           <TouchableOpacity style={[styles.card, styles.createPostButton]} onPress={() => alert('Create Tournament')}>
              <Text style={styles.createPostText}>Organize Tournament</Text>
            </TouchableOpacity>
            
            {tournaments.map(tournament => (
              <View key={tournament.id} style={styles.tournamentCard}>
                {tournament.image && (
                  <Image source={{ uri: tournament.image }} style={styles.tournamentBanner} />
                )}
                
                <View style={styles.tournamentContent}>
                  <Text style={styles.tournamentName}>{tournament.name}</Text>
                  <View style={styles.tournamentDetails}>
                    <View style={styles.tournamentDetail}>
                      <Text style={styles.detailLabel}>Organizer:</Text>
                      <Text style={styles.detailValue}>{tournament.organizer}</Text>
                    </View>
                    <View style={styles.tournamentDetail}>
                      <Text style={styles.detailLabel}>Schedule:</Text>
                      <Text style={styles.detailValue}>{tournament.schedule}</Text>
                    </View>
                    <View style={styles.tournamentDetail}>
                      <Text style={styles.detailLabel}>Prize:</Text>
                      <Text style={styles.detailValue}>{tournament.prize}</Text>
                    </View>
                    <View style={styles.tournamentDetail}>
                      <Text style={styles.detailLabel}>Participants:</Text>
                      <Text style={styles.detailValue}>{tournament.participants}</Text>
                    </View>
                  </View>
                  
                  <Text style={styles.tournamentDescription}>{tournament.description}</Text>
                  
                  <View style={styles.tournamentActions}>
                    <TouchableOpacity style={styles.tournamentButton}>
                      <Text style={styles.tournamentButtonText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tournamentButton, styles.registerButton]}>
                      <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        );
        
      case 'Celebrations':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={[styles.card, styles.createPostButton]} onPress={() => alert('Share Achievement')}>
              <Text style={styles.createPostText}>Share Your Achievement</Text>
            </TouchableOpacity>
            
            {celebrations.map(celebration => (
              <View key={celebration.id} style={styles.celebrationCard}>
                <View style={styles.postHeader}>
                  <Image source={{ uri: celebration.avatar }} style={styles.avatar} />
                  <View>
                    <Text style={styles.username}>{celebration.username}</Text>
                    <View style={styles.achievementBadge}>
                      <Text style={styles.achievementText}>{celebration.achievement}</Text>
                    </View>
                  </View>
                  <Text style={styles.timestamp}>{celebration.timestamp}</Text>
                </View>
                
                <Text style={styles.celebrationContent}>{celebration.content}</Text>
                
                {celebration.image && (
                  <Image source={{ uri: celebration.image }} style={styles.celebrationImage} />
                )}
                
                <View style={styles.celebrationFooter}>
                  <TouchableOpacity style={styles.congratsButton}>
                    <Text style={styles.congratsButtonText}>🎉 Congrats! ({celebration.congrats})</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareButton}>
                    <Text style={styles.shareButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
        
      default:
        return null;
    }
  };

  // Tab options with labels
  const tabOptions = ['Experience', 'Team-Up', 'Clans', 'Tournaments', 'Celebrations'];

  const renderTabButton = useCallback(({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === item && styles.activeTab,
        ]}
        onPress={() => setActiveTab(item)}
      >
        <Text style={[
          styles.tabText,
          activeTab === item && styles.activeTabText,
        ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }, [activeTab]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ width: '100%', height: 50 }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
          data={tabOptions}
          renderItem={renderTabButton}
          keyExtractor={(item) => item}
        />
      </View>
      
      <ScrollView style={styles.contentContainer}>
        {renderTabContent()}
      </ScrollView>
      
      <TouchableOpacity style={styles.fab} onPress={() => alert('Create New Content')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#282E34',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    padding: 5,
  },
  notificationIcon: {
    fontSize: 24,
    color: '#fff',
  },
  tabsContainer: {
    backgroundColor: '#282E34',
  },
  tabsContent: {
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
  },
  tabContent: {
    padding: 15,
  },
  card: {
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  createPostButton: {
    backgroundColor: '#3A7CA5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  createPostText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#1E2329',
    borderWidth: 1,
    borderColor: '#3A7CA5',
    marginLeft: 10,
  },
  secondaryButtonText: {
    color: '#3A7CA5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postCard: {
    backgroundColor: '#282E34',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  timestamp: {
    fontSize: 12,
    color: '#E0E0E0',
    marginLeft: 'auto',
  },
  postContent: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 10,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  postFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#3A7CA5',
    paddingTop: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  footerButtonText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  // Team-Up styles
  teamUpCard: {
    backgroundColor: '#282E34',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  userInfo: {
    flex: 1,
  },
  rankContainer: {
    backgroundColor: '#3A7CA5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  rankText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  teamDetails: {
    backgroundColor: '#1E2329',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 80,
    color: '#E0E0E0',
    fontSize: 13,
  },
  detailValue: {
    flex: 1,
    color: '#E0E0E0',
    fontSize: 13,
  },
  contactButton: {
    backgroundColor: '#3A7CA5',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Clans styles
  clanButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  clanCard: {
    backgroundColor: '#282E34',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  clanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  clanLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  clanName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  clanMembers: {
    fontSize: 12,
    color: '#888',
  },
  clanDescription: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 10,
    lineHeight: 20,
  },
  clanRequirements: {
    backgroundColor: '#1E2329',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  requirementsLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#E0E0E0',
    marginBottom: 2,
  },
  requirementsText: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  clanButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clanActionButton: {
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  clanActionButtonText: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  joinButton: {
    backgroundColor: '#3A7CA5',
    marginRight: 0,
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Tournaments styles
  tournamentCard: {
    backgroundColor: '#282E34',
    marginBottom: 15,
    overflow: 'hidden',
    borderRadius: 12,
  },
  tournamentBanner: {
    width: '100%',
    height: 100,
  },
  tournamentContent: {
    padding: 15,
  },
  tournamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 10,
  },
  tournamentDetails: {
    backgroundColor: '#1E2329',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  tournamentDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tournamentDescription: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 10,
    lineHeight: 20,
  },
  tournamentActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tournamentButton: {
    backgroundColor: '#1E2329',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  tournamentButtonText: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  registerButton: {
    backgroundColor: '#3A7CA5',
    marginRight: 0,
  },
  registerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Celebrations styles
  celebrationCard: {
    backgroundColor: '#282E34',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
  },
  achievementBadge: {
    backgroundColor: '#3A7CA5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  achievementText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  celebrationContent: {
    fontSize: 14,
    color: '#E0E0E0',
    marginVertical: 10,
    lineHeight: 20,
  },
  celebrationImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  celebrationFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#3A7CA5',
    paddingTop: 10,
  },
  congratsButton: {
    flex: 3,
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 10,
    backgroundColor: '#fff5e6',
    borderRadius: 12,
  },
  congratsButtonText: {
    color: '#ff8a00',
    fontSize: 14,
    fontWeight: '500',
  },
  shareButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  shareButtonText: {
    color: '#555555',
    fontSize: 14,
  },
  // Floating Action Button
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#3A7CA5',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CommunityScreen;