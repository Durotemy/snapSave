import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './AuthNavigator';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import CustomText from '../components/CustomText';
import { useUserAuth } from '../hooks/userAuth';
import { AppNavigator } from './AppNavigator';

export const RootNavigator = () => {
  const { user, isLoading } = useUserAuth();

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <CustomText style={styles.loadingText}>Loading...</CustomText>
      </View>
    );
  }

  console.log('User in here', user);

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});
