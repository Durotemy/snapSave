import { StyleSheet, Text, View } from 'react-native';
import React, { useRef, forwardRef } from 'react';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import { HStack, VStack } from '@gluestack-ui/themed';
import CustomText from '../CustomText';
import { ModalProps } from './interface';
import { LottieViewAnimation } from '../Lottie';

const CustomModal = forwardRef<ActionSheetRef, ModalProps>(
  ({ height = 200, content, title, success }, ref) => {
    return (
      <ActionSheet
        gestureEnabled
        ref={ref}
        useBottomSafeAreaPadding
        keyboardHandlerEnabled
      >
        <VStack height={height}>
          {success && (
            <VStack justifyContent="center" alignItems="center">
              <LottieViewAnimation />
            </VStack>
          )}
          <CustomText>{title}</CustomText>
          <HStack>{content}</HStack>
        </VStack>
      </ActionSheet>
    );
  },
);

export default CustomModal;
