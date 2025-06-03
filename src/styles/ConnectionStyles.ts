import { StyleSheet } from "react-native";

const ConnectionStyle = StyleSheet.create({
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

export default ConnectionStyle;