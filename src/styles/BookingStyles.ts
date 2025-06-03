import { StyleSheet } from "react-native";

const BookingStyles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#1E2329',
  },
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    marginVertical: 16,
    backgroundColor: '#3A7CA5',
    borderRadius: 25,
    padding: 4,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    alignSelf: 'center',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#FF6B35',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  card: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailCard: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
    detailTitle: {
    fontFamily: 'Bebas Neue',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  detailDescription: {
    fontSize: 14,
    color: '#E0E0E0',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  // Date selection
  dateSelectionContainer: {
    width: '90%',
    marginBottom: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  monthButton: {
    padding: 4,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  datesList: {
    paddingVertical: 8,
  },
  dateItem: {
    width: 60,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#1E2329',
  },
  selectedDateItem: {
    backgroundColor: '#3A7CA5',
  },
  todayDateItem: {
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  dayName: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 8,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  todayIndicator: {
    width: 6,
    height: 6,
    borderRadius: 10,
    backgroundColor: '#3A7CA5',
    position: 'absolute',
    bottom: 6,
  },

  // Time slots
  slotsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  slotsHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  timeSlotIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
    timeSlotIconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTimeSlotButton: {
    backgroundColor: '#3A7CA5',
    borderColor: '#3A7CA5',

  },
  expandedSlotsContainer: {
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  expandedSlotsHeader: {
    marginBottom: 12,
  },
  expandedSlotsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  slotsList: {
    gap: 12,
  },
  slotItem: {
    backgroundColor: '#1E2329',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'column',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  slotMainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slotTime: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  slotStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slotStatus: {
    fontSize: 14,
    color: '#4CAF50',
  },
  slotSelected: {
    borderLeftColor: '#0A3D62',
    backgroundColor: '#1E2329',
  },
  slotSelectedText: {
    color: '#FFFFFF',
  },
  slotUnavailable: {
    borderLeftColor: '#9E9E9E',
    opacity: 0.7,
  },
  slotUnavailableText: {
    color: '#E0E0E0',
  },
  slotLocked: {
    borderLeftColor: '#BDBDBD',
    backgroundColor: '#1E2329',
  },
  slotLockedText: {
    color: '#999',
  },
  slotFull: {
    borderLeftColor: '#E53935',
  },
  slotFullText: {
    color: '#E53935',
  },
  lockIcon: {
    marginRight: 4,
  },
  
  selectedSlotInfoContainer: {
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    },
    selectedSlotHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    selectedSlotTime: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  
    // Team indicators
    capacitySection: {
      marginTop: 8,
    },
  teamIndicators: {
    marginBottom: 8,
  },
  teamIndicator: {
    marginBottom: 8,
  },
  teamHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  teamLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  teamPlayerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIcon: {
    marginRight: 6,
  },
  joinTeamButton: {
    backgroundColor: '#3A7CA5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  joinTeamText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  
  // Capacity
  capacityContainer: {
    marginTop: 10,
  },
  capacityBarOuter: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  capacityBarInner: {
    height: '100%',
    borderRadius: 3,
  },
  capacityText: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  lockedMessageContainer: {
    marginTop: 12,
  },
  lockedMessage: {
    fontSize: 12,
    color: '#E0E0E0',
  },
  collapsedSlotText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  collapsedTimeSlotButton: {
    backgroundColor: '#F5F5F5',
    width: 'auto',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  // Team selection styles
  teamButton: {
    backgroundColor: '#1E2329',
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedTeamButton: {
    backgroundColor: '#3A7CA5',
  },
  fullTeamButton: {
    backgroundColor: '#E0E0E0',
    opacity: 0.7,
  },
  teamButtonText: {
    fontSize: 14,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  selectedTeamButtonText: {
    color: '#FFFFFF',
  },
  playerSelectionContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  playerCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  playerCountHeader: {
    fontSize: 14,
    color: '#555',
  },
  playerCountControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countButton: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  playerCountValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: '#3A7CA5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timeSlotButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  unavailableSlot: {
    backgroundColor: '#E0E0E0',
    opacity: 0.5,
  },
  unavailableSlotText: {
    color: '#1E2329',
  },
  lockedSlot: {
    backgroundColor: '#1E2329',
    
  },
  lockedSlotText: {
    color: '#FF9800',
  },
  timeSlotListContainer: {
    marginTop: 16,
  },
  timeSlotList: {
    gap: 10,
  },
  teamSelectionContainer: {
    marginBottom: 16,
  },
  teamSelectionHeader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  teamButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slotTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  playerInfoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  playerInfoHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  playerInfoSubheader: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 16,
  },
  playerIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerIdLabel: {
    fontSize: 16,
    color: '#E0E0E0',
    marginRight: 8,
  },
  playerIdValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  playerInputContainer: {
    marginBottom: 8,
  },
  playerInputLabel: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 4,
  },
  playerInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#1E2329',
  },
  button:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  }
});

export default BookingStyles;