import ReactNativeBiometrics, {
  type BiometryTypes,
} from 'react-native-biometrics';

export interface BiometricAvailability {
  available: boolean;
  biometryType: any | null;
  error: string | null | boolean | undefined;
}

export interface BiometricAuthResult {
  success: boolean;
  error: string | null | undefined;
}

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometricAvailability =
  async (): Promise<BiometricAvailability> => {
    try {
      const { available, biometryType, error } =
        await rnBiometrics.isSensorAvailable();

      return {
        available,
        biometryType: available ? biometryType : null,
        error: available ? true : error,
      };
    } catch (err) {
      return {
        available: false,
        biometryType: null,
        error: (err as Error).message,
      };
    }
  };

export type BiometricType = 'FaceID' | 'TouchID' | 'Biometrics';

export const getBiometricType = (biometricType: BiometricType) => {
  switch (biometricType) {
    case 'FaceID':
      return 'FaceID';
    case 'TouchID':
      return 'TouchID';
    case 'Biometrics':
      return 'Biometrics';
    default:
      return null;
  }
};

export const getBiometricIconName = (biometricType: BiometricType) => {
  switch (biometricType) {
    case 'FaceID':
      return 'camera-alt';
    case 'TouchID':
      return 'fingerprint';
    case 'Biometrics':
      return 'fingerprint';
    default:
      return null;
  }
};

export const performBiometricAuthentication = async (
  promptMessage: string = 'Authenticate to proceed',
): Promise<BiometricAuthResult> => {
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage,
      cancelButtonText: 'Cancel',
    });

    return {
      success,
      error: success ? null : 'Authentication failed',
    };
  } catch (err) {
    return {
      success: false,
      error: (err as Error).message,
    };
  }
};

export const createKeys = async (): Promise<{ publicKey: string } | null> => {
  try {
    const { publicKey } = await rnBiometrics.createKeys();
    return { publicKey };
  } catch (error) {
    console.error('Error creating biometric keys:', error);
    return null;
  }
};

export const biometricKeysExist = async (): Promise<boolean> => {
  try {
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    return keysExist;
  } catch (error) {
    console.error('Error checking biometric keys:', error);
    return false;
  }
};

export const createSignature = async (
  payload: string,
  promptMessage: string = 'Authenticate',
): Promise<{
  success: boolean;
  signature?: string;
  error?: string;
}> => {
  try {
    const { success, signature } = await rnBiometrics.createSignature({
      promptMessage,
      payload,
      cancelButtonText: 'Cancel',
    });

    return {
      success,
      signature,
    };
  } catch (error) {
    console.error('Error creating signature:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Signature creation failed',
    };
  }
};

export default {
  checkBiometricAvailability,
  getBiometricType,
  getBiometricIconName,
  performBiometricAuthentication,
  createKeys,
  biometricKeysExist,
  createSignature,
};
