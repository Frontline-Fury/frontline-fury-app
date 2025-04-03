import React from 'react';
import { Text, TextStyle, TextProps } from 'react-native';

interface TacticalTextProps extends TextProps {
  variant?: 'header' | 'subheader' | 'body' | 'caption' | 'label';
  color?: string;
  weight?: 'light' | 'regular' | 'bold' | 'extrabold';
}

const TacticalText: React.FC<TacticalTextProps> = ({
  children,
  variant = 'body',
  color,
  weight = 'regular',
  style,
  ...rest
}) => {
  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: color || '#E2E8F0', // Default to light text for dark mode
      letterSpacing: 0.5,
    };

    switch (variant) {
      case 'header':
        return {
          ...baseStyle,
          fontSize: 24,
          fontWeight: weight === 'extrabold' ? '800' : 'bold',
          textTransform: 'uppercase',
        };
      case 'subheader':
        return {
          ...baseStyle,
          fontSize: 18,
          fontWeight: weight === 'bold' ? '700' : '500',
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: 12,
          color: color || '#94A3B8',
          fontWeight: weight === 'light' ? '300' : '400',
        };
      case 'label':
        return {
          ...baseStyle,
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: 1,
        };
      default:
        return {
          ...baseStyle,
          fontSize: 16,
          fontWeight: weight === 'bold' ? '600' : '400',
        };
    }
  };

  const fontWeightMap: { [key: string]: TextStyle['fontWeight'] } = {
    light: '300',
    regular: '400',
    bold: '600',
    extrabold: '800',
  };

  return (
    <Text
      style={[
        getTextStyle(),
        { fontWeight: fontWeightMap[weight] },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default TacticalText;