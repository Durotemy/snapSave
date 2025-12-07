import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as biometricService from '../services/biometrics';
import { BiometricAvailability, BiometricType } from '../services/biometrics';

interface UseBiometricReturn {
  isAvailable: boolean;
  biometricType: BiometricType | null; // Changed from biometryType
  biometricTypeName: string | null;
  biometricIconName: string | null;
  isLoading: boolean;
  authenticate: (
    onSuccess: () => void,
    onError?: (error: string) => void,
  ) => Promise<void>;
  checkAvailability: () => Promise<void>;
}

export const useBiometric = (): UseBiometricReturn => {
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  // Changed variable name to biometricType (without 'y') for consistency
  const [biometricType, setBiometricType] = useState<BiometricType | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAvailability = async () => {
    setIsLoading(true);
    const availability: BiometricAvailability =
      await biometricService.checkBiometricAvailability();

    setIsAvailable(availability.available);
    // Update to use consistent naming
    setBiometricType(availability.biometryType);
    setIsLoading(false);

    console.log('Biometric availability:', availability);
  };

  useEffect(() => {
    checkAvailability();
  }, []);

  const authenticate = async (
    onSuccess: () => void,
    onError?: (error: string) => void,
  ) => {
    try {
      // Check availability first
      const availability = await biometricService.checkBiometricAvailability();

      if (!availability.available) {
        const errorMessage = getUnavailableMessage(availability.error);

        Alert.alert(
          'Biometrics Unavailable',
          errorMessage,
          availability.error?.includes('not enrolled')
            ? [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: () => onError?.(errorMessage),
                },
              ]
            : [{ text: 'OK', onPress: () => onError?.(errorMessage) }],
        );
        return;
      }

      // Perform authentication
      const result = await biometricService.performBiometricAuthentication(
        'Authenticate to login',
      );

      if (result.success) {
        onSuccess();
      } else {
        if (result.error) {
          onError?.(result.error);
        }
        // User cancelled - no need to show error
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Authentication failed';
      Alert.alert(
        'Authentication Error',
        'An error occurred during biometric authentication. Please try again.',
      );
      onError?.(errorMessage);
    }
  };

  const getUnavailableMessage = (
    error: string | null | boolean | undefined,
  ): string => {
    if (
      typeof error === 'string' &&
      (error.includes('not enrolled') || error.includes('No identities'))
    ) {
      return 'Please enroll your fingerprint or Face ID in device settings first.';
    }
    return 'Biometric authentication is not available on this device.';
  };

  return {
    isAvailable,
    biometricType, // Now consistent
    biometricTypeName: biometricService.getBiometricType(biometricType),
    biometricIconName: biometricService.getBiometricIconName(biometricType),
    isLoading,
    authenticate,
    checkAvailability,
  };
};
