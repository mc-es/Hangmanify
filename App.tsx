import React from 'react';
import { View } from 'react-native';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import Main from 'src/Main';

import { I18nProvider } from 'src/contexts/I18nContext';
import { ThemeProvider } from 'src/contexts/ThemeContext';

import * as Storybook from '.storybook';

const App = (): React.JSX.Element => (
  <ThemeProvider>
    <I18nProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Main />
      </View>
    </I18nProvider>
  </ThemeProvider>
);

export default Constants.expoConfig?.extra?.storybookEnabled ? Storybook.default : App;
