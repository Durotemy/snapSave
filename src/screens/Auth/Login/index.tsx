import { Alert, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Layout from '../../../layout';
import { set, VStack } from '@gluestack-ui/themed';
import CustomText from '../../../components/CustomText';
import FormInputField from '../../../components/InputField';
import CustomHeader from '../../../components/CustomHeader';
import { AppIcon } from '../../../components/Icons';
import useFormInput from '../../../hooks/useFormInput';
import { useBiometric } from '../../../hooks/BiometricHook';
import CustomButton from '../../../components/customButton.tsx';
import { useUserAuth } from '../../../hooks/userAuth.ts';
import { useNavigation } from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const { login, setUser } = useUserAuth();
  const CreateWithAuth = () => {
    auth()
      .createUserWithEmailAndPassword('Email', 'Password')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const email = useFormInput('');
  const password = useFormInput('');

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
  const performLogin = async (emailValue: string, passwordValue: string) => {
    setLoading(true);

    try {
      const credential = await auth().signInWithEmailAndPassword(
        emailValue,
        passwordValue,
      );

      const here = await credential.user.reload();
      console.log('here is food', here);

      setUser({
        id: credential.user.uid,
        email: credential.user.email ?? '',
        phonenumber: '',
      });

      setLoading(false);
      if (!credential.user.emailVerified) {
        await auth().signOut();
        Alert.alert(
          'Email not verified',
          'Please verify your email before logging in.',
        );
        return;
      }

      // ✅ SUCCESS
      console.log('User logged in:', credential.user.uid);
      // Navigation will happen via onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Login Failed', error.message);
    }
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
      {loading && <CustomText>Loading...</CustomText>}
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

            <Pressable onPress={() => navigation.navigate('Signup')}>
              <CustomText paddingRight={4} textAlign="right">
                Sign up
              </CustomText>
            </Pressable>
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
