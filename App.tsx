import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

import * as Storybook from './.storybook';

const App = (): React.JSX.Element => (
  <View style={styles.container}>
    <Text>Open up App.tsx to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
);

export default Constants.expoConfig?.extra?.storybookEnabled ? Storybook.default : App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
