import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Layout from '../../../layout';
import CustomHeader from '../../../components/CustomHeader';
import { HStack, VStack } from '@gluestack-ui/themed';
import FormInputField from '../../../components/InputField';
import useFormInput from '../../../hooks/useFormInput';
import CustomButton from '../../../components/customButton.tsx';
import { useUserAuth } from '../../../hooks/userAuth.ts';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import CustomText from '../../../components/CustomText/index.tsx';
import CustomModal from '../../../components/Modal/index.tsx';
import LottieView from 'lottie-react-native';

const SignUpScreen = () => {
  const { signup } = useUserAuth();
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const email = useFormInput('');
  const phonenumber = useFormInput('');
  const password = useFormInput('');

  const handleSubmit = async () => {
    email.clearError();
    phonenumber.clearError();
    password.clearError();

    let isValid = true;

    if (!email.value.trim()) {
      email.setError('Email is required');
      isValid = false;
    }
    if (!phonenumber.value.trim()) {
      phonenumber.setError('Phone number is required');
      isValid = false;
    }
    if (!password.value.trim()) {
      password.setError('Password is required');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const res = await signup(email.value, phonenumber.value, password.value);
      actionSheetRef.current?.setModalVisible();

      console.log('User signed up and saved in Firestore!', res);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <Layout>
      <CustomHeader text="Sign up to create an account" showBackButton />

      <VStack
        flex={1}
        marginTop={20}
        space={'sm'}
        justifyContent="space-between"
      >
        <VStack>
          <FormInputField
            placeholder="Enter email"
            label="Email"
            value={email.value}
            onChangeText={email.setValue}
            error={email.error}
            textContentType="emailAddress"
            // keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <FormInputField
            placeholder="Enter Phone Number"
            label="Phone number"
            value={phonenumber.value}
            onChangeText={phonenumber.setValue}
            error={phonenumber.error}
            // keyboardType="phone-pad"
            textContentType="telephoneNumber"
            autoCorrect={false}
            returnKeyType="next"
          />

          <FormInputField
            placeholder="Enter Password"
            label="Password"
            value={password.value}
            onChangeText={password.setValue}
            error={password.error}
            secureTextEntry
            textContentType="newPassword"
          />
        </VStack>

        <CustomButton
          onPress={handleSubmit}
          text="Sign Up"
          backgroundColor="#007AFF"
        />
      </VStack>

      <CustomModal
        title="Congratulation"
        content="Welcome to SnapSave! Your account has been successfully created."
        ref={actionSheetRef}
        success={true}
      />
    </Layout>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
