import { Alert, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Layout from '../../../layout';
import { VStack } from '@gluestack-ui/themed';
import CustomText from '../../../components/CustomText';
import FormInputField from '../../../components/InputField';
import CustomHeader from '../../../components/CustomHeader';
import { AppIcon } from '../../../components/Icons';
import useFormInput from '../../../hooks/useFormInput';
import { useBiometric } from '../../../hooks/BiometricHook';
import CustomButton from '../../../components/customButton.tsx';
import { useUserAuth } from '../../../hooks/userAuth.ts';

const LoginScreen = () => {
  const { login } = useUserAuth();

  const email = useFormInput('');
  const password = useFormInput('');

  // Use the biometric hook
  const {
    isAvailable: isBiometricAvailable,
    biometricTypeName,
    biometricIconName,
    isLoading: isBiometricLoading,
    authenticate: authenticateWithBiometric,
  } = useBiometric();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    email.clearError();
    password.clearError();

    let isValid = true;

    if (!email.value.trim()) {
      email.setError('Email is required');
      isValid = false;
    } else if (!validateEmail(email.value)) {
      email.setError('Please enter a valid email address');
      isValid = false;
    }

    if (!password.value.trim()) {
      password.setError('Password is required');
      isValid = false;
    } else if (password.value.length < 6) {
      password.setError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      performLogin(email.value, password.value);
    }
  };

  // Centralized login logic
  const performLogin = (emailValue: string, passwordValue: string) => {
    console.log('Login with:', { email: emailValue, password: passwordValue });

    // TODO: Add your login API call here
    // Example:
    // try {
    //   const response = await authService.login(emailValue, passwordValue);
    //   if (response.success) {
    //     // Navigate to home screen
    //     navigation.navigate('Home');
    //   }
    // } catch (error) {
    //   Alert.alert('Login Failed', error.message);
    // }
  };

  // Handle biometric login
  const handleBiometricLogin = async () => {
    await authenticateWithBiometric(
      // On success
      () => {
        console.log('Biometric authentication successful');

        // TODO: Retrieve stored credentials or token
        // For now, show success message
        Alert.alert(
          'Success',
          'Biometric authentication successful! Auto-logging in...',
          [
            {
              text: 'OK',
              onPress: () => {
                login('biometric@example.com', 'password');
                // useUserAuth().setUser({ id: 'biometric-user', name: 'Biometric User' });
                // In production, you would:
                // 1. Retrieve encrypted credentials from secure storage
                // 2. Call performLogin() or directly navigate to home
                // 3. Example: const credentials = await getStoredCredentials();
                //             performLogin(credentials.email, credentials.password);
              },
            },
          ],
        );
      },
      // On error (optional)
      error => {
        console.log('Biometric authentication failed:', error);
      },
    );
  };

  return (
    <Layout>
      <VStack flex={1} justifyContent="space-between">
        <VStack>
          <CustomHeader textSize="3xl" text="Login to continue" />

          <VStack marginTop={40} space="sm">
            <FormInputField
              placeholder="Enter email"
              label="Email"
              value={email.value}
              onChangeText={email.setValue}
              error={email.error}
              textContentType="none"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <FormInputField
              placeholder="Enter password"
              label="Password"
              value={password.value}
              onChangeText={password.setValue}
              error={password.error}
              secureTextEntry={true}
              textContentType="none"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
            />

            {/* Biometric Authentication Button - Only show if available */}
            {!isBiometricLoading && isBiometricAvailable && (
              <VStack paddingVertical="$8" alignItems="center">
                <Pressable
                  onPress={handleBiometricLogin}
                  style={({ pressed }) => [
                    styles.biometricButton,
                    pressed && styles.biometricButtonPressed,
                  ]}
                >
                  <AppIcon
                    name={biometricIconName || 'fingerprint'}
                    size={70}
                    color="#007AFF"
                  />
                </Pressable>
                <CustomText style={styles.biometricText}>
                  {biometricTypeName} Login
                </CustomText>
              </VStack>
            )}
          </VStack>
        </VStack>

        {/* Bottom button */}
        <CustomButton
          onPress={handleSubmit}
          text="Login"
          backgroundColor="#007AFF"
        />
      </VStack>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  biometricButton: {
    padding: 10,
    borderRadius: 50,
    opacity: 1,
  },
  biometricButtonPressed: {
    opacity: 0.6,
  },
  biometricText: {
    marginTop: 8,
    fontSize: 14,
    color: '#007AFF',
  },
});
