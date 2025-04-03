import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import TacticalText from './tacticaltextButton';

interface TacticalHeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const TacticalHeader: React.FC<TacticalHeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {leftIcon ? (
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={onLeftPress}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <TacticalText 
          variant="header" 
          style={styles.titleText}
        >
          {title}
        </TacticalText>

        {rightIcon ? (
          <TouchableOpacity 
            style={styles.iconContainer} 
            onPress={onRightPress}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#0F172A', // Very dark background
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#0F172A',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  titleText: {
    color: '#14B8A6', // Teal accent
    textAlign: 'center',
  },
});

export default TacticalHeader;