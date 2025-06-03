import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/CommunityStyles'; // Assuming you have a styles file

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



export default CommunityScreen;