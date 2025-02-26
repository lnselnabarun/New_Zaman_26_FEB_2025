import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Provider from './src/navigations/MainStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider />
    </SafeAreaProvider>
  );
}