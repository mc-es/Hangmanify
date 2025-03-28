import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './components/buttons/Button';
import { LANGUAGE_CODES } from './constants/localization';

import { useI18n, useTheme } from './contexts';

const Main = (): React.JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleI18n, locale } = useI18n();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: theme.text }}>
        {t('greetings.hi', { name: 'Anonymous' })}
      </Text>
      <Text style={{ color: theme.text }}>{t('greetings.welcome')}</Text>
      <Button onPress={toggleTheme} text="Toggle Theme" />
      <Button
        onPress={() => {
          if (locale === LANGUAGE_CODES.EN) toggleI18n(LANGUAGE_CODES.TR);
          else toggleI18n(LANGUAGE_CODES.EN);
        }}
        text="Toggle I18n"
      />
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
