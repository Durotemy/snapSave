import React, { useEffect } from 'react';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from '@react-native-firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from '@react-native-firebase/auth';
import { Alert } from 'react-native';

interface User {
  id: string;
  phonenumber: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, id: string) => Promise<void>;
  signup: (
    email: string,
    phonenumber: string,
    password: string,
    id: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        try {
          const firestore = getFirestore();
          const snap = await getDoc(doc(firestore, 'users', firebaseUser.uid));

          console.log('Firebase User:', firebaseUser);

          if (!firebaseUser.emailVerified) {
            setUser(null);
            setIsLoading(false);
            return;
          }
          const refreshedUser = auth.currentUser;
          if (!refreshedUser) {
            setUser(null);
          }
          if (!snap.exists()) {
            setUser(null);
          }

          if (snap.exists()) {
            setUser(snap.data() as User);
          } else {
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              phonenumber: '',
            });
          }
        } catch (e) {
          console.error('Failed to fetch user profile', e);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    phonenumber: string,
    password: string,
    id: string,
  ) => {
    try {
      setIsLoading(true);

      // Get auth instance using modular API
      const auth = getAuth();

      // Create user in Firebase Auth
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      Alert.alert(
        'Verify your email',
        'A verification email has been sent to your email address. Please verify your email before logging in.',
      );

      const res = await sendEmailVerification(credential.user);
      console.log('Email verification sent:', res);

      const firestore = getFirestore();

      // Save extra info in Firestore
      const userRef = doc(firestore, 'users', credential.user.uid);
      const userData = {
        id: credential.user.uid,
        email,
        phonenumber,
      };

      await setDoc(userRef, userData);

      // Update context
      // setUser(userData);

      console.log('User signed up successfully');
    } catch (error) {
      Alert.alert(`Signup Failed', 'An error occurred during signup.${error}`);
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
