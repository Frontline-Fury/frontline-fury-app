import React from "react";
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  GestureResponderEvent 
} from "react-native";

interface TacticalButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const TacticalButton: React.FC<TacticalButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#334155' : '#0F766E', // Teal with disabled state
          borderColor: disabled ? '#475569' : '#14B8A6',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? '#1E293B' : '#1E3A8A', // Deep blue
          borderColor: disabled ? '#475569' : '#3B82F6',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? '#475569' : '#14B8A6',
          borderWidth: 2,
        };
      case 'danger':
        return {
          backgroundColor: disabled ? '#450A0A' : '#991B1B', // Dark red
          borderColor: disabled ? '#7F1D1D' : '#EF4444',
        };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return { color: disabled ? '#64748B' : '#14B8A6' };
      default:
        return { color: disabled ? '#64748B' : '#FFFFFF' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { 
          paddingVertical: 8, 
          paddingHorizontal: 12,
          borderRadius: 6 
        };
      case 'large':
        return { 
          paddingVertical: 16, 
          paddingHorizontal: 24,
          borderRadius: 10 
        };
      default:
        return { 
          paddingVertical: 12, 
          paddingHorizontal: 18,
          borderRadius: 8 
        };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        style,
        { opacity: disabled ? 0.5 : 1 }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.text,
          getTextStyle(),
          textStyle,
          size === 'small' ? styles.smallText : 
          size === 'large' ? styles.largeText : styles.mediumText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  text: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});

export default TacticalButton;