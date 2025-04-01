import { COLORS } from './colors';
import { FONTS } from './fonts';

export const enum SYSTEM_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

interface Palette {
  background: string;
  text: string;
}

interface GlobalColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
}

interface FontWeights {
  bold: string;
  light: string;
  medium: string;
  regular: string;
  semiBold: string;
}

interface FontSizes {
  _10: number;
  _12: number;
  _14: number;
  _16: number;
  _18: number;
  _20: number;
  _24: number;
  _32: number;
  _48: number;
}

export interface Theme {
  palette: Palette;
  global: {
    color: GlobalColors;
    font: {
      families: {
        nunito: FontWeights;
        poppins: FontWeights;
      };
      sizes: FontSizes;
    };
  };
}

const global = {
  color: {
    primary: COLORS.BLUE._500,
    secondary: COLORS.GRAY._500,
    success: COLORS.GREEN._500,
    danger: COLORS.RED._500,
    warning: COLORS.YELLOW._500,
    info: COLORS.CYAN._500,
    light: COLORS.ZINC._50,
    dark: COLORS.ZINC._950,
  },
  font: {
    families: {
      nunito: {
        bold: FONTS.Nunito.Bold,
        light: FONTS.Nunito.Light,
        medium: FONTS.Nunito.Medium,
        regular: FONTS.Nunito.Regular,
        semiBold: FONTS.Nunito.SemiBold,
      },
      poppins: {
        bold: FONTS.Poppins.Bold,
        light: FONTS.Poppins.Light,
        medium: FONTS.Poppins.Medium,
        regular: FONTS.Poppins.Regular,
        semiBold: FONTS.Poppins.SemiBold,
      },
    },
    sizes: {
      _10: 10,
      _12: 12,
      _14: 14,
      _16: 16,
      _18: 18,
      _20: 20,
      _24: 24,
      _32: 32,
      _48: 48,
    },
  },
};

export const LightTheme: Theme = {
  palette: {
    background: COLORS.GRAY._100,
    text: COLORS.GRAY._900,
  },
  global,
};

export const DarkTheme: Theme = {
  palette: {
    background: COLORS.GRAY._800,
    text: COLORS.GRAY._50,
  },
  global,
};
