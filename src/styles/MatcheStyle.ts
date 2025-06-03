import { StyleSheet } from "react-native";

const MatcheStyle = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#1E2329',
      padding: 16,
    },
    header:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 16,
    },
    backButton:{
      padding: 8,
    },
    headerTitle:{
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    scrollContainer:{
      paddingBottom: 16,
      
    },
    matchItem:{
      backgroundColor: '#2C2F33',
      padding: 16,
      borderRadius: 8,
      marginBottom: 16,
      color: '#fff',
    },
  });

  export default MatcheStyle;