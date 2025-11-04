/**
 * FocusFencer Main App Component
 */

import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from './context/ThemeContext';
import {FocusProvider} from './context/FocusContext';
import {AppNavigator} from './navigation/AppNavigator';
import {adManager} from './utils/ads';
import {updater} from './utils/updater';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App: React.FC = () => {
  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    // Initialize AdMob
    await adManager.initialize();

    // Check for updates on app launch
    setTimeout(() => {
      updater.checkForUpdates('1.0.0', true);
    }, 2000);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ThemeProvider>
          <FocusProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
              <AppNavigator />
            </NavigationContainer>
          </FocusProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
