/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { COLORS } from './src/constants/theme';
import { initializeAds } from './src/services/ads/ads';

const App = () => {

  useEffect(() => {
    initializeAds();
  }, [])

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />
      <RootNavigator />
    </>
  );
};

export default App;
