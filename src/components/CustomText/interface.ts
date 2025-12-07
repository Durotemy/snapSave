import { Text, TextStyle, StyleSheet } from 'react-native';

export interface CustomTextProps {
  children: React.ReactNode;
  variant?: 'regular' | 'bold' | 'semibold' | 'light' | 'medium';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  color?: string;
  textAlign?: 'left' | 'right' | 'center';
  style?: TextStyle;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}

export const styles = StyleSheet.create({
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
