import { StyleSheet } from "react-native";
import ProfileScreen from "../screens/Profile";


const ProfileStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  viewProfile: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  menuItemsContainer: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3A7CA5',
  },
  icon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#E0E0E0',
  },
  card: {
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
  },
});

export default ProfileStyle;