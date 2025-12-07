import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { CustomTextProps, styles } from './interface';

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'regular',
  size = 'md',
  color = '#000000',
  style,
  textAlign = 'center',
  padding = 'sm',
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
}) => {
  return (
    <Text
      style={[
        styles[variant],
        styles[size],
        styles[padding],
        { textAlign },
        { color },
        style,
        paddingLeft !== undefined ? { paddingLeft } : {},
        paddingRight !== undefined ? { paddingRight } : {},
        paddingTop !== undefined ? { paddingTop } : {},
        paddingBottom !== undefined ? { paddingBottom } : {},
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
