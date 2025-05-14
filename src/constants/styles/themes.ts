import { Dimensions } from 'src/utils/dimensions';

import { COLORS } from './colors';
import { FONTS } from './fonts';

export const enum SYSTEM_THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

const rawFontSizes = {
  _10: 10,
  _12: 12,
  _14: 14,
  _16: 16,
  _18: 18,
  _20: 20,
  _24: 24,
  _32: 32,
  _48: 48,
} satisfies Record<string, number>;

const fontSizes = Object.entries(rawFontSizes).reduce(
  (acc, [key, value]) => {
    acc[key as keyof typeof rawFontSizes] = Dimensions.fs(value);
    return acc;
  },
  {} as Record<keyof typeof rawFontSizes, number>
);

type CommonColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

type ColorFamily = (typeof COLORS)[keyof typeof COLORS];
type ColorTone = ColorFamily[keyof ColorFamily];

interface Palette {
  readonly background: ColorTone;
  readonly text: ColorTone;
}

interface FontTheme {
  readonly families: typeof FONTS;
  readonly sizes: typeof fontSizes;
}

interface GlobalTheme {
  color: Record<CommonColors, ColorTone>;
  font: FontTheme;
}

export interface Theme {
  palette: Palette;
  global: GlobalTheme;
}

const global: GlobalTheme = {
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
    families: FONTS,
    sizes: fontSizes,
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
