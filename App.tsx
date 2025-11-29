import { NewAppScreen } from '@react-native/new-app-screen';
import {
  StatusBar,
  StyleSheet,
  
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { useEffect } from 'react';
import { Box, GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import Layout from './src/layout';
import CustomText from './src/components/CustomText';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const loadResources = async () => {
      // Load fonts, data, etc.

      // Hide BootSplash when ready
      BootSplash.hide({ fade: true });
    };
    loadResources();
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
     <Layout style={styles.container}>
       <CustomText variant="bold" size="xl" color="#1A1A1A">
          Card Title
        </CustomText>
        <CustomText variant="light" size="md" >
          This is some content inside a card using our custom text component.
        </CustomText>
      </Layout>
    </GluestackUIProvider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nunitoText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 15,
    marginTop: 50,
  },
  nunitoBold: {
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
  robotoText: {
    fontFamily: 'Roboto_Condensed-Black',
    fontSize: 20,
  },
});

export default App;
