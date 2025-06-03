import { StyleSheet } from "react-native";

const SupportStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2329',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#282E34',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E0E0',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A7CA5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  gameCard: {
    backgroundColor: '#282E34',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameDate: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  winBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  lossBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  resultText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  gameDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailColumn: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E0E0E0',
  },
  viewAllButton: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#3A7CA5',
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default SupportStyle;