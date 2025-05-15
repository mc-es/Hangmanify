import React, { useEffect, useState } from 'react';

import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

import { I18nProvider, ThemeProvider } from 'src/contexts';
import Main from 'src/Main';
import { LoadFonts } from 'src/utils';

import './global.css';
import * as Storybook from '.storybook';

const isStorybookEnabled = Constants.expoConfig?.extra?.storybookEnabled as boolean;

if (!isStorybookEnabled)
  SplashScreen.preventAutoHideAsync().catch((error) => console.error(error));

const App = (): React.JSX.Element => {
  const [isAppReady, setIsAppReady] = useState<boolean>(isStorybookEnabled);

  useEffect(() => {
    if (isStorybookEnabled) return;

    const prepare = async (): Promise<void> => {
      try {
        await LoadFonts();
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
        <Main />
      </I18nProvider>
    </ThemeProvider>
  );
};

export default isStorybookEnabled ? Storybook.default : App;
