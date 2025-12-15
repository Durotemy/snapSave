import React, { memo } from 'react';
import { HStack } from '@gluestack-ui/themed';
import CustomText from '../CustomText';
import { CustomHeaderProps } from './interface';
import { AppIcon } from '../Icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import BackArrow from "../../assets/png/Arrow.png"

const CustomHeader = memo(
  ({ text, textSize, showBackButton }: CustomHeaderProps) => {
    const navigation = useNavigation();
    return (
      <HStack alignItems="center">
        <Pressable onPress={() => navigation.goBack()}>
          {showBackButton && (
            <AppIcon name="arrow-back" size={30} color="#000000" />
          )}
        </Pressable>
        {/* <BackArrow />  */}
        <CustomText paddingLeft={8} variant="bold" size={textSize}>
          {text}
        </CustomText>
      </HStack>
    );
  },
);

export default CustomHeader;
