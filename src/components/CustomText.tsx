import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';

interface CustomTextProps {
  children: React.ReactNode;
  variant?: 'regular' | 'bold' | 'semibold' | 'light' | 'medium';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  style?: TextStyle;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'regular',
  size = 'md',
  color = '#000000',
  style,
}) => {
  return (
    <Text
      style={[
        styles[variant],
        styles[size],
        { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  // Font variants (Nunito)
  regular: {
    fontFamily: 'Nunito-Regular',
  },
  bold: {
    fontFamily: 'Nunito-Bold',
  },
  semibold: {
    fontFamily: 'Nunito-SemiBold',
  },
  light: {
    fontFamily: 'Nunito-Light',
  },
  medium: {
    fontFamily: 'Nunito-Medium',
  },
  
  // Font sizes
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
  xl: {
    fontSize: 20,
  },
  '2xl': {
    fontSize: 24,
  },
  '3xl': {
    fontSize: 30,
  },
});

export default CustomText;