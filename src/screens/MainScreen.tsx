import React from 'react';
import { View, Text } from 'react-native';

const MainScreen: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontFamily:'poppins', fontSize:18, color:'#fe608f'}}>Welcome Soldier</Text>
    </View>
  );
};

export default MainScreen;