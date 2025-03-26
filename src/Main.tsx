import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './components/buttons/Button';
import { useTheme } from './contexts/ThemeContext';

const Main = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>Main</Text>
      <Button onPress={toggleTheme} text="Toggle Theme" />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
