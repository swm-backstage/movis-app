import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './src/api/queryClient';
import RootNavigator from './src/navigations/RootNavigator';

function App(): React.JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
