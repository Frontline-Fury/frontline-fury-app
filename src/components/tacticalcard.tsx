import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacity 
} from 'react-native';
import TacticalText from './tacticaltextButton';

interface TacticalCardProps {
  title?: string;
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'transparent' | 'bordered';
}

const TacticalCard: React.FC<TacticalCardProps> = ({
  title,
  children,
  onPress,
  style,
  variant = 'default'
}) => {
  const CardWrapper = onPress ? TouchableOpacity : View;

  const getCardStyle = () => {
    switch (variant) {
      case 'transparent':
        return styles.transparentCard;
      case 'bordered':
        return styles.borderedCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <CardWrapper 
      style={[
        styles.card, 
        getCardStyle(), 
        style
      ]}
      onPress={onPress}
    >
      {title && (
        <View style={styles.headerContainer}>
          <TacticalText 
            variant="subheader" 
            weight="bold"
            style={styles.titleText}
          >
            {title}
          </TacticalText>
        </View>
      )}
      <View style={styles.contentContainer}>
        {children}
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  defaultCard: {
    backgroundColor: '#1E293B', // Dark background
  },
  transparentCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.6)', // Semi-transparent
    borderWidth: 1,
    borderColor: 'rgba(71, 85, 105, 0.3)', // Slight border
  },
  borderedCard: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#334155', // Slate border
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(71, 85, 105, 0.3)',
    paddingBottom: 10,
    marginBottom: 10,
  },
  contentContainer: {
    // Additional content styling if needed
  },
  titleText: {
    color: '#14B8A6', // Teal accent
  },
});

export default TacticalCard;