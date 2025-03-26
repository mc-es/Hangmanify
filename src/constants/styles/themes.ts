import { COLORS } from './colors';

export const enum SYSTEM_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface Theme {
  background: string;
  text: string;
}

export const LightTheme: Theme = {
  background: COLORS.GRAY._100,
  text: COLORS.GRAY._900,
};

export const DarkTheme: Theme = {
  background: COLORS.GRAY._800,
  text: COLORS.GRAY._50,
};
