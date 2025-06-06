import React, { useState, useEffect, useCallback, memo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  LayoutAnimation, 
  Platform, 
  UIManager, 
  ScrollView, 
  FlatList, 
  Alert,
  TextInput 
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';
import { MaterialIcons, Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import styles from '../styles/BookingStyles'; // Assuming you have a styles file

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type BookingScreenProps = StackScreenProps<RootStackParamList, 'Booking'>;

// Memoized DateItem component for better performance
interface DateItemProps {
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  onSelect: (date: Date) => void;
  formatDate: (date: Date) => string;
  getDayName: (date: Date) => string;
}

const DateItem = memo(({ 
  date, 
  isSelected, 
  isToday, 
  onSelect, 
  formatDate, 
  getDayName 
}: DateItemProps) => {
  const handlePress = useCallback(() => {
    onSelect(date);
  }, [date, onSelect]);

  return (
    <TouchableOpacity 
      style={[
        styles.dateItem, 
        isSelected && styles.selectedDateItem,
        isToday && styles.todayDateItem
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.dayName, isSelected && styles.selectedDateText]}>
        {getDayName(date)}
      </Text>
      <Text style={[styles.dateNumber, isSelected && styles.selectedDateText]}>
        {formatDate(date)}
      </Text>
      {isToday && <View style={styles.todayIndicator} />}
    </TouchableOpacity>
  );
});

// Type definition for a time slot with player count information
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  selected: boolean;
  locked: boolean;
  playerCount: {
    team1: number;  // Current players in team 1
    team2: number;  // Current players in team 2
    maxPerTeam: number; // Max players per team
  };
}

// Type for time slot period
type TimeSlotPeriod = 'morning' | 'afternoon' | 'evening';

const Booking: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const { gameId, gameName } = route.params || {};
  const [activeTab, setActiveTab] = useState<'Spike' | 'CTF' | 'TDM' | 'Hostage'>('Spike');
  
  // Active time slot
  const [activeTimeSlot, setActiveTimeSlot] = useState<TimeSlotPeriod | null>(null);
  
  // Selected slot ID
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  
  // Player count that the user is bringing
  const [userPlayerCount, setUserPlayerCount] = useState<number>(1);
  
  // Team selection (1 or 2) 
  const [selectedTeam, setSelectedTeam] = useState<1 | 2>(1);
  
  // Date selection states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesList, setDatesList] = useState<Date[]>([]);

  // Player information states
  const [showPlayerInfoSection, setShowPlayerInfoSection] = useState(false);
  const [playerIds, setPlayerIds] = useState<string[]>(['']);
  const [currentUserPlayerId, setCurrentUserPlayerId] = useState('');

  // Time slots with selection state and player count information
  const [timeSlots, setTimeSlots] = useState<Record<TimeSlotPeriod, TimeSlot[]>>({
    morning: [
      { 
        id: 'morning-1', 
        time: '9:00 AM - 10:00 AM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 3, team2: 2, maxPerTeam: 5 }
      },
      { 
        id: 'morning-2', 
        time: '10:00 AM - 11:00 AM', 
        available: true, 
        selected: false, 
        locked: true,
        playerCount: { team1: 5, team2: 4, maxPerTeam: 5 }
      },
      { 
        id: 'morning-3', 
        time: '11:00 AM - 12:00 PM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 2, team2: 3, maxPerTeam: 5 }
      },
      { 
        id: 'morning-4', 
        time: '12:00 PM - 1:00 PM', 
        available: true, 
        selected: false, 
        locked: true,
        playerCount: { team1: 5, team2: 5, maxPerTeam: 5 }
      },
    ],
    afternoon: [
      { 
        id: 'afternoon-1', 
        time: '1:00 PM - 2:00 PM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 4, team2: 3, maxPerTeam: 5 }
      },
      { 
        id: 'afternoon-2', 
        time: '2:00 PM - 3:00 PM', 
        available: true, 
        selected: false, 
        locked: true,
        playerCount: { team1: 1, team2: 1, maxPerTeam: 5 }
      },
      { 
        id: 'afternoon-3', 
        time: '3:00 PM - 4:00 PM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 3, team2: 5, maxPerTeam: 5 }
      },
      { 
        id: 'afternoon-4', 
        time: '4:00 PM - 5:00 PM', 
        available: false, 
        selected: false, 
        locked: true,
        playerCount: { team1: 5, team2: 5, maxPerTeam: 5 }
      },
    ],
    evening: [
      { 
        id: 'evening-1', 
        time: '5:00 PM - 6:00 PM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 2, team2: 2, maxPerTeam: 5 }
      },
      { 
        id: 'evening-2', 
        time: '6:00 PM - 7:00 PM', 
        available: true, 
        selected: false, 
        locked: true,
        playerCount: { team1: 4, team2: 4, maxPerTeam: 5 }
      },
      { 
        id: 'evening-3', 
        time: '7:00 PM - 8:00 PM', 
        available: true, 
        selected: false, 
        locked: false,
        playerCount: { team1: 0, team2: 1, maxPerTeam: 5 }
      },
      { 
        id: 'evening-4', 
        time: '8:00 PM - 9:00 PM', 
        available: true, 
        selected: false, 
        locked: true,
        playerCount: { team1: 5, team2: 3, maxPerTeam: 5 }
      },
    ]
  });

  // Generate dates for the current month
  useEffect(() => {
    const today = new Date();
    const dates = getDatesForMonth(currentMonth);
    setDatesList(dates);
    
    // Select today's date by default on first load
    if (!selectedDate) {
      const todayInList = dates.find(date => 
        date.getDate() === today.getDate() && 
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
      if (todayInList) {
        setSelectedDate(todayInList);
      } else if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    }
  }, [currentMonth]);

  // Check slot status when slots change
  useEffect(() => {
    if (activeTimeSlot) {
      checkAndUpdateLockedSlots(activeTimeSlot);
    }
  }, [timeSlots]);

  // Reset player count when slot selection changes
  useEffect(() => {
    if (selectedSlotId) {
      setUserPlayerCount(1);
      setShowPlayerInfoSection(false);
      setPlayerIds(['']);
    }
  }, [selectedSlotId]);

  // Function to check if a slot is full
  const isSlotFull = useCallback((slot: TimeSlot) => {
    return slot.playerCount.team1 === slot.playerCount.maxPerTeam && 
           slot.playerCount.team2 === slot.playerCount.maxPerTeam;
  }, []);

  // Function to calculate remaining spaces in a slot
  const getRemainingSpaces = useCallback((slot: TimeSlot) => {
    const team1Remaining = slot.playerCount.maxPerTeam - slot.playerCount.team1;
    const team2Remaining = slot.playerCount.maxPerTeam - slot.playerCount.team2;
    return team1Remaining + team2Remaining;
  }, []);

  // Function to get capacity status text and color
  const getCapacityStatus = useCallback((slot: TimeSlot) => {
    const remaining = getRemainingSpaces(slot);
    const total = slot.playerCount.maxPerTeam * 2;
    
    if (remaining === 0) {
      return { text: 'Full', color: '#E53935' };
    } else if (remaining <= 2) {
      return { text: 'Almost Full', color: '#FF9800' };
    } else if (remaining <= 5) {
      return { text: 'Filling Up', color: '#4CAF50' };
    } else {
      return { text: 'Open', color: '#2196F3' };
    }
  }, [getRemainingSpaces]);

  // Function to get all dates for a given month
  const getDatesForMonth = (month: Date) => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const today = new Date();
    
    // Start from today or the first day of the month if we're looking at a future month
    const startDate = new Date(year, monthIndex, 1);
    if (monthIndex === today.getMonth() && year === today.getFullYear()) {
      startDate.setDate(today.getDate());
    }
    
    // Get dates for the next 30 days or until the end of the month
    const lastDay = new Date(year, monthIndex + 1, 0).getDate();
    const daysRemaining = lastDay - startDate.getDate() + 1;
    const numberOfDays = Math.min(30, daysRemaining);
    
    const dates = [];
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Function to move to the next month
  const nextMonth = useCallback(() => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  }, [currentMonth]);

  // Function to move to the previous month
  const prevMonth = useCallback(() => {
    const prev = new Date(currentMonth);
    const today = new Date();
    prev.setMonth(prev.getMonth() - 1);
    
    // Don't allow going to past months
    if (prev.getMonth() < today.getMonth() && prev.getFullYear() <= today.getFullYear()) {
      return;
    }
    
    setCurrentMonth(prev);
  }, [currentMonth]);

  // Format date for display
  const formatDate = useCallback((date: Date) => {
    return date.getDate().toString().padStart(2, '0');
  }, []);

  // Format day name
  const getDayName = useCallback((date: Date) => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  }, []);

  // Format month name
  const getMonthName = useCallback((date: Date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }, []);

  // Time slot options with labels and icons
  const timeSlotOptions = [
    { id: 'morning', label: 'Morning', icon: 'sunrise', color: '#FF9800' },
    { id: 'afternoon', label: 'Afternoon', icon: 'sun', color: '#FF5722' },
    { id: 'evening', label: 'Evening', icon: 'sunset', color: '#5C6BC0' }
  ];

  // Game mode details
  const gameModeDetails = {
    Spike: {
      title: 'Spike Game Mode',
      description: 'Plant or defuse the spike to win. Attack team tries to plant the spike, while defense team defends the sites.',
      players: '5v5',
      duration: '30-40 minutes',
      difficulty: 'Medium'
    },
    CTF: {
      title: 'Capture The Flag',
      description: 'Steal the enemy flag and return it to your base while protecting your own flag.',
      players: '6v6',
      duration: '20-30 minutes',
      difficulty: 'Easy'
    },
    TDM: {
      title: 'Team Deathmatch',
      description: 'Eliminate the opposing team. The team with the most kills at the end wins.',
      players: '4v4',
      duration: '15-20 minutes',
      difficulty: 'Easy'
    },
    Hostage: {
      title: 'Hostage Rescue',
      description: 'Attackers must rescue the hostage while defenders prevent the rescue.',
      players: '5v5',
      duration: '25-35 minutes',
      difficulty: 'Hard'
    }
  };

  // Toggle time slot selection
  const toggleTimeSlot = useCallback((slot: TimeSlotPeriod) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // If there's a selected slot ID, clear it
    if (selectedSlotId) {
      setSelectedSlotId(null);
    }
    
    setActiveTimeSlot(activeTimeSlot === slot ? null : slot);
  }, [activeTimeSlot, selectedSlotId]);

  // Check if unlocked slots are full and update locked slots accordingly
  const checkAndUpdateLockedSlots = useCallback((period: TimeSlotPeriod) => {
    const currentSlots = timeSlots[period];
    
    // Check if slots 1 and 3 (index 0 and 2) are full
    const slot1Full = isSlotFull(currentSlots[0]);
    const slot3Full = isSlotFull(currentSlots[2]);
    
    // If both slots are full, unlock slots 2 and 4
    if (slot1Full && slot3Full) {
      setTimeSlots(prev => {
        const newTimeSlots = { ...prev };
        const periodSlots = [...newTimeSlots[period]];
        
        // Unlock slots 2 and 4 (index 1 and 3)
        if (periodSlots[1].locked) {
          periodSlots[1].locked = false;
        }
        if (periodSlots[3].locked) {
          periodSlots[3].locked = false;
        }
        
        newTimeSlots[period] = periodSlots;
        return newTimeSlots;
      });
    }
  }, [timeSlots, isSlotFull]);

  // Handle locked slot tap
  const handleLockedSlotTap = useCallback((period: TimeSlotPeriod) => {
    Alert.alert(
      "Slot Locked",
      "This slot will be unlocked when the available slots are full.",
      [{ text: "OK", onPress: () => {} }]
    );
  }, []);

  // Handle slot selection
  const handleSlotSelection = useCallback((slotId: string, period: TimeSlotPeriod) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    // Toggle selection if clicking the same slot, otherwise select new slot
    if (selectedSlotId === slotId) {
      setSelectedSlotId(null);
    } else {
      // Find the slot to get current player counts
      const selectedSlot = timeSlots[period].find(slot => slot.id === slotId);
      
      if (selectedSlot) {
        // Determine which team has more space
        const team1Remaining = selectedSlot.playerCount.maxPerTeam - selectedSlot.playerCount.team1;
        const team2Remaining = selectedSlot.playerCount.maxPerTeam - selectedSlot.playerCount.team2;
        
        // Auto-select the team with more space
        setSelectedTeam(team1Remaining >= team2Remaining ? 1 : 2);
        setSelectedSlotId(slotId);
      }
    }
  }, [selectedSlotId, timeSlots]);
  
  // Increment player count
  const incrementPlayerCount = useCallback(() => {
    if (!selectedSlotId || !activeTimeSlot) return;
    
    // Find the selected slot
    const slot = timeSlots[activeTimeSlot].find(s => s.id === selectedSlotId);
    if (!slot) return;
    
    // Calculate remaining space in the selected team
    const remainingSpace = selectedTeam === 1 
      ? slot.playerCount.maxPerTeam - slot.playerCount.team1 
      : slot.playerCount.maxPerTeam - slot.playerCount.team2;
    
    // Only increment if there's room
    if (userPlayerCount < remainingSpace) {
      setUserPlayerCount(prev => prev + 1);
    } else {
      Alert.alert(
        "Team Limit Reached",
        `You can't add more than ${remainingSpace} player(s) to Team ${selectedTeam}.`,
        [{ text: "OK", onPress: () => {} }]
      );
    }
  }, [userPlayerCount, selectedSlotId, activeTimeSlot, timeSlots, selectedTeam]);
  
  // Decrement player count
  const decrementPlayerCount = useCallback(() => {
    if (userPlayerCount > 1) {
      setUserPlayerCount(prev => prev - 1);
    }
  }, [userPlayerCount]);
  
  // Switch team selection
  const switchTeam = useCallback(() => {
    setSelectedTeam(prev => prev === 1 ? 2 : 1);
    setUserPlayerCount(1); // Reset player count when switching teams
  }, []);

  // Handle showing player info section
  const handleShowPlayerInfo = useCallback(() => {
    if (userPlayerCount === 1) {
      // For single player, fetch their unique ID (mock implementation)
      setCurrentUserPlayerId(`PLAYER-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
    } else {
      // For multiple players, create empty slots
      setPlayerIds(Array(userPlayerCount).fill(''));
    }
    setShowPlayerInfoSection(true);
  }, [userPlayerCount]);

  // Handle player ID changes for multiple players
  const handlePlayerIdChange = useCallback((index: number, value: string) => {
    setPlayerIds(prev => {
      const newPlayerIds = [...prev];
      newPlayerIds[index] = value;
      return newPlayerIds;
    });
  }, []);

  // Validate player IDs before confirmation
  const validatePlayerIds = useCallback(() => {
    if (userPlayerCount === 1) return true; // Already has ID
    
    // Check all player IDs are filled
    if (playerIds.some(id => !id.trim())) {
      Alert.alert("Error", "Please enter IDs for all players");
      return false;
    }
    
    // Check for duplicate IDs
    const uniqueIds = new Set(playerIds);
    if (uniqueIds.size !== playerIds.length) {
      Alert.alert("Error", "Player IDs must be unique");
      return false;
    }
    
    return true;
  }, [playerIds, userPlayerCount]);

  // Find the selected slot object
  const selectedSlot = selectedSlotId && activeTimeSlot
    ? timeSlots[activeTimeSlot].find(slot => slot.id === selectedSlotId) 
    : null;

  // Calculate spaces left in each team for the selected slot
  const team1SpacesLeft = selectedSlot 
    ? selectedSlot.playerCount.maxPerTeam - selectedSlot.playerCount.team1 
    : 0;
  
  const team2SpacesLeft = selectedSlot 
    ? selectedSlot.playerCount.maxPerTeam - selectedSlot.playerCount.team2 
    : 0;

  // Render capacity indicator
  const renderCapacityIndicator = useCallback((slot: TimeSlot) => {
    const remaining = getRemainingSpaces(slot);
    const total = slot.playerCount.maxPerTeam * 2;
    const filledPercentage = ((total - remaining) / total) * 100;
    
    const capacityStatus = getCapacityStatus(slot);
    
    return (
      <View style={styles.capacityContainer}>
        <View style={styles.capacityBarOuter}>
          <View 
            style={[
              styles.capacityBarInner, 
              { 
                width: `${filledPercentage}%`,
                backgroundColor: capacityStatus.color 
              }
            ]} 
          />
        </View>
        <Text style={[styles.capacityText, { color: capacityStatus.color }]}>
          {remaining} spots left
        </Text>
      </View>
    );
  }, [getRemainingSpaces, getCapacityStatus]);

  // Handle booking confirmation
  const confirmBooking = useCallback(() => {
    if (!selectedSlot || !selectedSlotId || !activeTimeSlot) {
      Alert.alert("Please select a time slot");
      return;
    }
    
    if (showPlayerInfoSection && !validatePlayerIds()) {
      return;
    }
    
    // Add the user's players to the selected team
    setTimeSlots(prev => {
      const newTimeSlots = { ...prev };
      const periodSlots = [...newTimeSlots[activeTimeSlot]];
      
      const slotIndex = periodSlots.findIndex(s => s.id === selectedSlotId);
      if (slotIndex >= 0) {
        const updatedSlot = { ...periodSlots[slotIndex] };
        
        if (selectedTeam === 1) {
          updatedSlot.playerCount = {
            ...updatedSlot.playerCount,
            team1: updatedSlot.playerCount.team1 + userPlayerCount
          };
        } else {
          updatedSlot.playerCount = {
            ...updatedSlot.playerCount,
            team2: updatedSlot.playerCount.team2 + userPlayerCount
          };
        }
        
        periodSlots[slotIndex] = updatedSlot;
        newTimeSlots[activeTimeSlot] = periodSlots;
      }
      
      return newTimeSlots;
    });
    
    // Reset states
    setSelectedSlotId(null);
    setUserPlayerCount(1);
    setShowPlayerInfoSection(false);
    setPlayerIds(['']);
    
    Alert.alert(
      "Booking Confirmed!",
      `You've booked ${userPlayerCount} player${userPlayerCount > 1 ? 's' : ''} for Team ${selectedTeam} at ${selectedSlot.time}.`,
      [{ text: "OK", onPress: () => {} }]
    );
  }, [selectedSlot, selectedSlotId, activeTimeSlot, selectedTeam, userPlayerCount, showPlayerInfoSection, validatePlayerIds]);

  // Get the details for the active tab
  const activeDetails = gameModeDetails[activeTab];

  // Properly memoized key extractor for FlatList
  const keyExtractor = useCallback((item: Date) => item.toISOString(), []);

  // Handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    // Reset slot selection when date changes
    setSelectedSlotId(null);
  }, []);

  // Render date item with performance optimizations
  const renderDateItem = useCallback(({ item }: { item: Date }) => {
    const today = new Date();
    const isSelected = selectedDate !== null && 
      item.getDate() === selectedDate.getDate() && 
      item.getMonth() === selectedDate.getMonth() &&
      item.getFullYear() === selectedDate.getFullYear();
    
    const isToday = 
      item.getDate() === today.getDate() && 
      item.getMonth() === today.getMonth() &&
      item.getFullYear() === today.getFullYear();
      
    return (
      <DateItem 
        date={item}
        isSelected={isSelected}
        isToday={isToday}
        onSelect={handleDateSelect}
        formatDate={formatDate}
        getDayName={getDayName}
      />
    );
  }, [selectedDate, formatDate, getDayName, handleDateSelect]);

  // Cache initial window metrics to avoid re-calculating during scroll
  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 60, // width of item
    offset: 60 * index, // width * index
    index,
  }), []);

  // Render player info section
  const PlayerInfoSection = memo(() => {
    if (userPlayerCount === 1) {
      return (
        <View style={styles.playerInfoContainer}>
          <Text style={styles.playerInfoHeader}>Your Player Information</Text>
          <View style={styles.playerIdContainer}>
            <Text style={styles.playerIdLabel}>Player ID:</Text>
            <Text style={styles.playerIdValue}>{currentUserPlayerId}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.playerInfoContainer}>
        <Text style={styles.playerInfoHeader}>Enter Player Information</Text>
        <Text style={styles.playerInfoSubheader}>
          Please enter unique IDs for all {userPlayerCount} players
        </Text>
        
        {playerIds.map((id, index) => (
          <View key={index} style={styles.playerInputContainer}>
            <Text style={styles.playerInputLabel}>Player {index + 1}:</Text>
            <TextInput
              style={styles.playerInput}
              value={id}
              onChangeText={(text) => handlePlayerIdChange(index, text)}
              placeholder={`Enter ID for player ${index + 1}`}
              placeholderTextColor="#999"
            />
          </View>
        ))}
      </View>
    );
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.tabContainer}>
          {['Spike', 'CTF', 'TDM', 'Hostage'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as 'Spike' | 'CTF' | 'TDM' | 'Hostage')}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Game Mode Detail Card */}
      <View style={[styles.card, styles.detailCard]}>
        <Text style={styles.detailTitle}>{activeDetails.title}</Text>
        <Text style={styles.detailDescription}>{activeDetails.description}</Text>
        <View style={styles.detailStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Players:</Text>
            <Text style={styles.statValue}>{activeDetails.players}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Duration:</Text>
            <Text style={styles.statValue}>{activeDetails.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Difficulty:</Text>
            <Text style={styles.statValue}>{activeDetails.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Date Selection Section */}
      <View style={styles.dateSelectionContainer}>
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={prevMonth} style={styles.monthButton}>
            <MaterialIcons name="chevron-left" size={24} color="#3A7CA5" />
          </TouchableOpacity>
          
          <Text style={styles.monthText}>{getMonthName(currentMonth)}</Text>
          
          <TouchableOpacity onPress={nextMonth} style={styles.monthButton}>
            <MaterialIcons name="chevron-right" size={24} color="#3A7CA5" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={datesList}
          renderItem={renderDateItem}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.datesList}
          initialNumToRender={7}
          maxToRenderPerBatch={10}
          windowSize={5}
          getItemLayout={getItemLayout}
          removeClippedSubviews={true}
        />
      </View>

      {/* Time Slots Section */}
      <View style={styles.slotsContainer}>
        <Text style={styles.slotsHeader}>Available Time Slots</Text>

        {/* Time Slot Icons */}
        <View style={styles.timeSlotIconsRow}>
          {timeSlotOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.button, styles.timeSlotIconButton,
                activeTimeSlot === option.id && !selectedSlotId && styles.activeTimeSlotButton,
                activeTimeSlot === option.id && selectedSlotId && styles.collapsedTimeSlotButton
              ]}
              onPress={() => toggleTimeSlot(option.id as TimeSlotPeriod)}
            >
              <Feather 
                name={option.icon as any} 
                size={28} 
                color={(activeTimeSlot === option.id && !selectedSlotId) ? '#fff' : option.color} 
              />
              {activeTimeSlot === option.id && selectedSlotId && (
                <Text style={styles.collapsedSlotText}>
                  {option.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Selected Time Slot Info */}
        {selectedSlot && selectedSlotId && (
          <View style={[styles.card, styles.selectedSlotInfoContainer]}>
            <View style={styles.selectedSlotHeader}>
              <Text style={styles.selectedSlotTime}>{selectedSlot.time}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setSelectedSlotId(null)}
              >
                <AntDesign name="close" size={18} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.playerSelectionContainer}>
              <View style={styles.teamSelectionContainer}>
                <Text style={styles.teamSelectionHeader}>Select your team:</Text>
                <View style={styles.teamButtons}>
                  <TouchableOpacity 
                    style={[
                      styles.button, styles.teamButton,
                      selectedTeam === 1 && styles.selectedTeamButton,
                      team1SpacesLeft === 0 && styles.fullTeamButton
                    ]}
                    onPress={() => setSelectedTeam(1)}
                    disabled={team1SpacesLeft === 0}
                  >
                    <Text style={[
                      styles.teamButtonText,
                      selectedTeam === 1 && styles.selectedTeamButtonText
                    ]}>
                      Team 1 ({selectedSlot.playerCount.team1}/{selectedSlot.playerCount.maxPerTeam})
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={[
                      styles.button, styles.teamButton,
                      selectedTeam === 2 && styles.selectedTeamButton,
                      team2SpacesLeft === 0 && styles.fullTeamButton
                    ]}
                    onPress={() => setSelectedTeam(2)}
                    disabled={team2SpacesLeft === 0}
                  >
                    <Text style={[
                      styles.teamButtonText,
                      selectedTeam === 2 && styles.selectedTeamButtonText
                    ]}>
                      Team 2 ({selectedSlot.playerCount.team2}/{selectedSlot.playerCount.maxPerTeam})
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.playerCountContainer}>
                <Text style={styles.playerCountHeader}>
                  Number of players you're bringing:
                </Text>
                
                <View style={styles.playerCountControls}>
                  <TouchableOpacity 
                    style={[styles.button, styles.countButton]}
                    onPress={decrementPlayerCount}
                    disabled={userPlayerCount <= 1}
                  >
                    <Feather name="minus" size={24} color={userPlayerCount <= 1 ? '#ccc' : '#3A7CA5'} />
                  </TouchableOpacity>
                  
                  <Text style={styles.playerCountValue}>{userPlayerCount}</Text>
                  
                  <TouchableOpacity 
                    style={[styles.button, styles.countButton]}
                    onPress={incrementPlayerCount}
                    disabled={
                      (selectedTeam === 1 && userPlayerCount >= team1SpacesLeft) ||
                      (selectedTeam === 2 && userPlayerCount >= team2SpacesLeft)
                    }
                  >
                    <Feather 
                      name="plus" 
                      size={24} 
                      color={
                        (selectedTeam === 1 && userPlayerCount >= team1SpacesLeft) ||
                        (selectedTeam === 2 && userPlayerCount >= team2SpacesLeft) 
                        ? '#ccc' 
                        : '#3A7CA5'
                      } 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {/* Player Information Section */}
            {showPlayerInfoSection && <PlayerInfoSection />}
            
            {/* Buttons */}
            {!showPlayerInfoSection ? (
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={handleShowPlayerInfo}
              >
                <Text style={styles.confirmButtonText}>Continue to Player Info</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={confirmBooking}
              >
                <Text style={styles.confirmButtonText}>Confirm Booking</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Time Slot Lists */}
        {activeTimeSlot && !selectedSlotId && (
          <View style={styles.timeSlotListContainer}>
            {timeSlots[activeTimeSlot].map((slot, index) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.timeSlotButton,
                  !slot.available && styles.unavailableSlot,
                  slot.locked && styles.lockedSlot
                ]}
                onPress={() => {
                  if (slot.locked) {
                    handleLockedSlotTap(activeTimeSlot);
                  } else if (slot.available) {
                    handleSlotSelection(slot.id, activeTimeSlot);
                  }
                }}
                disabled={!slot.available}
              >
                <View style={styles.slotTimeContainer}>
                  <Text style={[
                    styles.slotTime,
                    !slot.available && styles.unavailableSlotText,
                    slot.locked && styles.lockedSlotText
                  ]}>
                    {slot.time}
                  </Text>
                  
                  {/* Lock icon */}
                  {slot.locked && (
                    <FontAwesome name="lock" size={16} color="#FF9800" style={styles.lockIcon} />
                  )}
                </View>
                
                {slot.available && !slot.locked && renderCapacityIndicator(slot)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};






export default Booking;