import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import CustomText from '../CustomText';

interface ButtonColor {
  backgroundColor?: string;
  textSize?: string;
  text: string;
  onPress?: () => void;
}

const CustomButton = ({
  backgroundColor,
  textSize,
  text,
  onPress,
}: ButtonColor) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: 'center',
      }}
    >
      <CustomText
        variant="bold"
        color={'#FFFF'}
        textAlign="center"
        padding="md"
      >
        {text}
      </CustomText>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
