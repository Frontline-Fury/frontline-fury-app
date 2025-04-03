import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TextInputProps, 
  ViewStyle 
} from 'react-native';
import TacticalText from './tacticaltextButton'; // Assuming previous component

interface TacticalInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

const TacticalInput: React.FC<TacticalInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <TacticalText variant="label" style={styles.label}>
          {label}
        </TacticalText>
      )}
      <View 
        style={[
          styles.inputContainer, 
          isFocused && styles.focusedContainer,
          error && styles.errorContainer
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          placeholderTextColor="#64748B"
          style={[
            styles.input, 
            style,
            { paddingLeft: leftIcon ? 40 : 15, 
              paddingRight: rightIcon ? 40 : 15 }
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && (
        <TacticalText variant="caption" color="#EF4444" style={styles.errorText}>
          {error}
        </TacticalText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B', // Dark background
    borderWidth: 1,
    borderColor: '#334155', // Slate border
    borderRadius: 8,
    height: 50,
  },
  focusedContainer: {
    borderColor: '#14B8A6', // Teal focus color
  },
  errorContainer: {
    borderColor: '#EF4444', // Red error color
  },
  input: {
    flex: 1,
    color: '#E2E8F0', // Light text
    fontSize: 16,
  },
  leftIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  errorText: {
    marginTop: 5,
  },
});

export default TacticalInput;