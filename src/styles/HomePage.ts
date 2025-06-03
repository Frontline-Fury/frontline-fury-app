import { StyleSheet } from 'react-native';

const HomePageStyles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
    backgroundColor: '#1E2329', // Dark background from palette
  },
  headerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLogo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  headerTitleContainer: {
    alignItems: 'flex-end',
  },
  headerTitlePrimary: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35', // Bright Accent Orange
  },
  headerTitleSecondary: {
    fontSize: 16,
    color: '#E0E0E0', // Light text for dark mode
  },
  sectionContainer: {
    width: "95%",
    alignSelf: 'center',
    marginTop: 15,
    backgroundColor: '#4A5563', // Gunmetal Gray
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E0E0E0', // Light text
  },
  performanceSection: {
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#3A7CA5', // Cool Blue
    borderRadius: 25,
    padding: 5,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FF6B35', // Bright Accent Orange
  },
  tabText: {
    fontSize: 16,
    color: '#E0E0E0',
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
    fontWeight: 'bold',
  },
  performanceContentContainer: {
    width: "95%",
    backgroundColor: '#4A5563', // Gunmetal Gray
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#2C5E4F', // Tactical Green
    borderRadius: 10,
    padding: 15,
  },
  performanceImageContainer: {
    position: 'relative',
    marginRight: 15,
  },
  performanceImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B35', // Bright Accent Orange
  },
  rankBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF6B35', // Bright Accent Orange
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  performanceDetailsContainer: {
    flex: 1,
  },
  performanceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E0E0E0', // Light text
  },
  achievementsContainer: {
    marginLeft: 5,
  },
  achievementItem: {
    marginBottom: 5,
  },
  achievementText: {
    fontSize: 14,
    color: '#D2B48C', // Sand Tan for achievements
  },
  carouselContainer: {
    width: '100%', 
    height: 300, 
    alignItems: 'center',
  },
  // Booking Slots Styles
  bookingSlotCard: {
    backgroundColor: '#2C5E4F', // Tactical Green
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  bookingSlotHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bookingSlotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  bookingSlotDateTime: {
    fontSize: 14,
    color: '#FF6B35', // Bright Accent Orange
  },
  teamSeatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamSeatBlock: {
    width: '48%',
  },
  teamLabel: {
    color: '#E0E0E0',
    fontSize: 16,
    marginBottom: 5,
  },
  seatText: {
    color: '#D2B48C', // Sand Tan
    fontSize: 14,
    marginBottom: 5,
  },
  seatProgressBar: {
    height: 5,
    borderRadius: 3,
  },
});

export default HomePageStyles;