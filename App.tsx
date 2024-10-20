import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/RootNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>

  );
}

export default App;
