import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import BootSplash from 'react-native-bootsplash';
import { AuthProvider } from './src/providers/AuthProvider';
import { RootNavigator } from './src/navigations/RootNavigator';

// Providers
// import { AuthProvider } from './src/providers/AuthProvider';
// import { AppStateProvider } from './src/providers/AppStateProvider';

// // Navigation
// import { RootNavigator } from './src/navigation/RootNavigator';

function App() {
  React.useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;