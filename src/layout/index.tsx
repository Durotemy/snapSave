import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, ViewStyle } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface LayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  backgroundColor?: string;
  padding?: number;
  style?: ViewStyle;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  scrollable = false,
  backgroundColor = '#FFFFFF',
  padding = 20,
  style,
}) => {
  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <Container
        style={[
          styles.container,
          { padding, backgroundColor },
          style,
        ]}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default Layout;