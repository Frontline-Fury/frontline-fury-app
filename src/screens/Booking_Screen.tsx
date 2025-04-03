import React, { useState, useEffect, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, ScrollView, FlatList, Alert } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';
import { MaterialIcons, Feather } from '@expo/vector-icons';

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

// Type definition for a time slot
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  selected: boolean;
  locked: boolean;
}

// Type for time slot period
type TimeSlotPeriod = 'morning' | 'afternoon' | 'evening';

const Booking: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const { gameId, gameName } = route.params || {};
  const [activeTab, setActiveTab] = useState<'Spike' | 'CTF' | 'TDM' | 'Hostage'>('Spike');
  
  // Active time slot
  const [activeTimeSlot, setActiveTimeSlot] = useState<TimeSlotPeriod | null>(null);
  
  // Date selection states
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [datesList, setDatesList] = useState<Date[]>([]);

  // Time slots with selection state
  const [timeSlots, setTimeSlots] = useState<Record<TimeSlotPeriod, TimeSlot[]>>({
    morning: [
      { id: 'morning-1', time: '9:00 AM - 10:00 AM', available: true, selected: false, locked: false },
      { id: 'morning-2', time: '10:00 AM - 11:00 AM', available: true, selected: false, locked: true },
      { id: 'morning-3', time: '11:00 AM - 12:00 PM', available: true, selected: false, locked: false },
      { id: 'morning-4', time: '12:00 PM - 1:00 PM', available: true, selected: false, locked: true },
    ],
    afternoon: [
      { id: 'afternoon-1', time: '1:00 PM - 2:00 PM', available: true, selected: false, locked: false },
      { id: 'afternoon-2', time: '2:00 PM - 3:00 PM', available: true, selected: false, locked: true },
      { id: 'afternoon-3', time: '3:00 PM - 4:00 PM', available: true, selected: false, locked: false },
      { id: 'afternoon-4', time: '4:00 PM - 5:00 PM', available: true, selected: false, locked: true },
    ],
    evening: [
      { id: 'evening-1', time: '5:00 PM - 6:00 PM', available: true, selected: false, locked: false },
      { id: 'evening-2', time: '6:00 PM - 7:00 PM', available: true, selected: false, locked: true },
      { id: 'evening-3', time: '7:00 PM - 8:00 PM', available: true, selected: false, locked: false },
      { id: 'evening-4', time: '8:00 PM - 9:00 PM', available: true, selected: false, locked: true },
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

  // Function to move to the previous month for
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
    setActiveTimeSlot(activeTimeSlot === slot ? null : slot);
  }, [activeTimeSlot]);

  // Handle slot selection
  const handleSlotSelection = useCallback((slotId: string, period: TimeSlotPeriod) => {
    setTimeSlots(prev => {
      const newTimeSlots = { ...prev };
      const periodSlots = [...newTimeSlots[period]];
      
      // Find the selected slot
      const slotIndex = periodSlots.findIndex(s => s.id === slotId);
      if (slotIndex === -1 || !periodSlots[slotIndex].available || periodSlots[slotIndex].locked) {
        return prev;
      }
      
      // Toggle selection for this slot
      periodSlots[slotIndex] = {
        ...periodSlots[slotIndex],
        selected: !periodSlots[slotIndex].selected
      };
      
      // Update the slots for this period
      newTimeSlots[period] = periodSlots;
      
      // Check conditions for unlocking slots 2 and 4
      const slot1Selected = periodSlots[0].selected;
      const slot3Selected = periodSlots[2].selected;
      
      // Update lock status based on selection
      if (slot1Selected && slot3Selected) {
        // Unlock slots 2 and 4
        if (periodSlots[1].locked) {
          periodSlots[1].locked = false;
        }
        if (periodSlots[3].locked) {
          periodSlots[3].locked = false;
        }
      } else {
        // Lock slots 2 and 4
        if (!periodSlots[1].locked) {
          periodSlots[1].locked = true;
          periodSlots[1].selected = false; // Unselect if it was selected
        }
        if (!periodSlots[3].locked) {
          periodSlots[3].locked = true;
          periodSlots[3].selected = false; // Unselect if it was selected
        }
      }
      
      return newTimeSlots;
    });
  }, []);

  // Check if prerequisites are met for locked slots
  const checkPrerequisitesMet = useCallback((period: TimeSlotPeriod) => {
    const slot1Selected = timeSlots[period][0].selected;
    const slot3Selected = timeSlots[period][2].selected;
    return slot1Selected && slot3Selected;
  }, [timeSlots]);

  // Get the details for the active tab
  const activeDetails = gameModeDetails[activeTab];

  // Properly memoized key extractor for FlatList
  const keyExtractor = useCallback((item: Date) => item.toISOString(), []);

  // Handle date selection
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
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

  // Function to handle tapping on a locked slot
  const handleLockedSlotTap = useCallback((period: TimeSlotPeriod) => {
    Alert.alert(
      "Slot Locked",
      "You need to book slots 1 and 3 first to unlock this slot.",
      [{ text: "OK", onPress: () => {} }]
    );
  }, []);

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: '#fff' }}
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
      <View style={styles.detailCard}>
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

        {/* Time Slot Icons in Row */}
        <View style={styles.timeSlotIconsRow}>
          {timeSlotOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.timeSlotIconButton,
                activeTimeSlot === option.id && styles.activeTimeSlotButton
              ]}
              onPress={() => toggleTimeSlot(option.id as TimeSlotPeriod)}
            >
              <Feather 
                name={option.icon as any} 
                size={28} 
                color={activeTimeSlot === option.id ? '#fff' : option.color} 
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Expanded Slots */}
        {activeTimeSlot && (
          <View style={styles.expandedSlotsContainer}>
            <View style={styles.expandedSlotsHeader}>
              <Text style={styles.expandedSlotsTitle}>
                {timeSlotOptions.find(o => o.id === activeTimeSlot)?.label} Slots
                {selectedDate && ` - ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
              </Text>
            </View>
            <View style={styles.slotsList}>
              {timeSlots[activeTimeSlot].map((slot, index) => (
                <TouchableOpacity 
                  key={slot.id}
                  style={[
                    styles.slotItem, 
                    !slot.available && styles.slotUnavailable,
                    slot.locked && styles.slotLocked,
                    slot.selected && styles.slotSelected
                  ]}
                  disabled={!slot.available || slot.locked}
                  onPress={() => 
                    slot.locked 
                      ? handleLockedSlotTap(activeTimeSlot) 
                      : handleSlotSelection(slot.id, activeTimeSlot)
                  }
                >
                  <Text style={[
                    styles.slotTime, 
                    !slot.available && styles.slotUnavailableText,
                    slot.locked && styles.slotLockedText
                  ]}>
                    {slot.time}
                  </Text>
                  
                  <View style={styles.slotStatusContainer}>
                    {slot.locked && (
                      <MaterialIcons name="lock" size={16} color="#999" style={styles.lockIcon} />
                    )}
                    <Text style={[
                      styles.slotStatus, 
                      !slot.available && styles.slotUnavailableText,
                      slot.locked && styles.slotLockedText,
                      slot.selected && styles.slotSelectedText
                    ]}>
                      {slot.selected ? 'Selected' : 
                      slot.available ? (slot.locked ? 'Locked' : 'Available') : 'Booked'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Prerequisites message for locked slots */}
            {timeSlots[activeTimeSlot].some(slot => slot.locked) && (
              <View style={styles.prerequisitesContainer}>
                <Text style={styles.prerequisitesText}>
                  Select slots 1 and 3 to unlock slots 2 and 4
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#3A7CA5',
    borderRadius: 25,
    padding: 5,
  },
  tabButton: {
    padding: 10,
    borderRadius: 25,
    marginHorizontal: 5,
    backgroundColor: '#3A7CA5',
  },
  activeTab: {
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#fff',
    fontSize: 16,
  },
  activeTabText: {
    color: '#3A7CA5',
  },
  detailCard: {
    backgroundColor: '#f5f8fa',
    borderRadius: 15,
    padding: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
    lineHeight: 20,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  // Date Selection Styles
  dateSelectionContainer: {
    width: '90%',
    marginTop: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  monthText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  monthButton: {
    padding: 5,
  },
  datesList: {
    paddingVertical: 10,
  },
  dateItem: {
    width: 60,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#f5f8fa',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedDateItem: {
    backgroundColor: '#3A7CA5',
  },
  dayName: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedDateText: {
    color: '#fff',
  },
  todayDateItem: {
    borderWidth: 1,
    borderColor: '#3A7CA5',
  },
  todayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3A7CA5',
    position: 'absolute',
    bottom: 10,
  },
  // Time Slots Styles
  slotsContainer: {
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
  slotsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  timeSlotIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  timeSlotIconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f8fa',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTimeSlotButton: {
    backgroundColor: '#3A7CA5',
  },
  expandedSlotsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 6,
  },
  expandedSlotsHeader: {
    backgroundColor: '#f5f8fa',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  expandedSlotsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  slotsList: {
    padding: 10,
  },
  slotItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  slotUnavailable: {
    backgroundColor: '#f5f5f5',
  },
  slotLocked: {
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  slotSelected: {
    backgroundColor: '#e8f4fd',
    borderColor: '#3A7CA5',
    borderWidth: 1,
  },
  slotTime: {
    fontSize: 14,
    color: '#333',
  },
  slotStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  slotUnavailableText: {
    color: '#999',
  },
  slotLockedText: {
    color: '#999',
  },
  slotSelectedText: {
    color: '#3A7CA5',
    fontWeight: 'bold',
  },
  slotStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    marginRight: 4,
  },
  prerequisitesContainer: {
    padding: 10,
    backgroundColor: '#fff8e1',
    borderTopWidth: 1,
    borderTopColor: '#ffe0b2',
    alignItems: 'center',
  },
  prerequisitesText: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
  }
});

export default Booking;