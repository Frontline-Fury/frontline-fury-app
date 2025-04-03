import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  activeOpacity?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = "#FF6600",
  textColor = "white",
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: disabled ? '#cccccc' : backgroundColor },
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      <Text 
        style={[
          styles.text, 
          { color: disabled ? '#666666' : textColor },
          textStyle
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;