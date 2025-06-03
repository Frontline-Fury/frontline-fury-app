import { StyleSheet } from "react-native";


const CommunityStyle = StyleSheet.create({
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

export default CommunityStyle;