import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');


const LeaderBoardStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
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
    color: '#FFFFFF',
  },
  listHeader: {
    backgroundColor: '#1E2329',
    paddingHorizontal: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#3A7CA5',
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
    backgroundColor: '#FF6B35',
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
  topPlayersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  topPlayerCard: {
    alignItems: 'center',
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 10,
    width: width / 3.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topPlayerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  topPlayerDetails: {
    alignItems: 'center',
  },
  topPlayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  topPlayerScore: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E2329',
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerRank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginRight: 10,
  },
  playerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  playerName: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  playerScore: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  rankBadge: {
    backgroundColor: '#FF6B35',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    right: 5,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default LeaderBoardStyle;