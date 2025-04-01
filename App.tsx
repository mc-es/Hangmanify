import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import Main from 'src/Main';

import { I18nProvider } from 'src/contexts/I18nContext';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { loadFonts } from 'src/utils/load-fonts';

import * as Storybook from '.storybook';

SplashScreen.preventAutoHideAsync().catch((error) => console.error(error));

const App = (): React.JSX.Element => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  useEffect(() => {
    const prepare = async (): Promise<void> => {
      try {
        await loadFonts();
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isAppReady) return <></>;

  return (
    <ThemeProvider>
      <I18nProvider>
        <View style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Main />
        </View>
      </I18nProvider>
    </ThemeProvider>
  );
};

export default Constants.expoConfig?.extra?.storybookEnabled ? Storybook.default : App;
