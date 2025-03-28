import React from 'react';
import { View } from 'react-native';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import { I18nProvider, ThemeProvider } from 'src/contexts';
import Main from 'src/Main';

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
