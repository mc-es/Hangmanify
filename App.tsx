import React from 'react';
import { View } from 'react-native';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Main from 'src/Main';

import { ThemeProvider } from 'src/contexts/ThemeContext';

import * as Storybook from '.storybook';

const App = (): React.JSX.Element => (
  <ThemeProvider>
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Main />
    </View>
  </ThemeProvider>
);

export default Constants.expoConfig?.extra?.storybookEnabled ? Storybook.default : App;
