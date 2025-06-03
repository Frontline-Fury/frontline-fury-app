import { StyleSheet } from "react-native";


const BattalionStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerSection: {
    // Fixed section at the top
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  emblem: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#4caf50',
    borderWidth: 2,
  },
  battalionName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  motto: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#a5d6a7',
    marginTop: 4,
  },
  xpBarContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    height: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  xpText: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: 12,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 8,
    borderBottomColor: '#4caf50',
    borderBottomWidth: 1,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomColor: '#4caf50',
    borderBottomWidth: 3,
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1, // This makes it take the remaining space
    marginHorizontal: 16,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  memberName: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: '600',
  },
  memberRole: {
    color: '#a5d6a7',
    fontSize: 12,
    marginTop: 2,
  },
  squadRow: {
    paddingVertical: 14,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  squadName: {
    color: '#e0e0e0',
    fontSize: 18,
    fontWeight: '700',
  },
  squadCount: {
    color: '#a5d6a7',
    fontSize: 14,
    marginTop: 2,
  },
  eventRow: {
    paddingVertical: 14,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  eventTitle: {
    color: '#e0e0e0',
    fontSize: 16,
    fontWeight: '700',
  },
  eventDate: {
    color: '#a5d6a7',
    fontSize: 13,
    marginTop: 2,
  },
  chatPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BattalionStyle;