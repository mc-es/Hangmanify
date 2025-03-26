import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ColorSchemeName } from 'react-native';
import { useColorScheme } from 'react-native';

import type { Theme } from 'src/constants/styles';
import { DarkTheme, LightTheme, SYSTEM_THEME } from 'src/constants/styles';

interface ThemeContextProps {
  system: SYSTEM_THEME;
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  system: SYSTEM_THEME.LIGHT,
  theme: LightTheme,
  toggleTheme: () => {},
});

const getThemeAndSystem = (
  scheme: ColorSchemeName
): { theme: Theme; system: SYSTEM_THEME } => ({
  theme: scheme === SYSTEM_THEME.DARK ? DarkTheme : LightTheme,
  system: scheme === SYSTEM_THEME.DARK ? SYSTEM_THEME.DARK : SYSTEM_THEME.LIGHT,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const computedSystem = getThemeAndSystem(systemColorScheme).system;
  const [theme, setTheme] = useState<Theme>(getThemeAndSystem(systemColorScheme).theme);

  useEffect(() => {
    setTheme(getThemeAndSystem(systemColorScheme).theme);
  }, [systemColorScheme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === LightTheme ? DarkTheme : LightTheme));
  };

  const contextValue = useMemo(
    () => ({
      system: computedSystem,
      theme,
      toggleTheme,
    }),
    [computedSystem, theme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);
