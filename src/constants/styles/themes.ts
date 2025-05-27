import { dimensions } from 'src/utils';

import { COLORS } from './colors';
import { FONTS } from './fonts';

const sizeValues = [10, 12, 14, 16, 18, 20, 24, 32, 48] as const;
const fontSizes = Object.freeze(
  Object.fromEntries(sizeValues.map((value) => [`_${value}`, dimensions.fs(value)]))
) as Readonly<Record<`_${(typeof sizeValues)[number]}`, number>>;

export const enum SYSTEM_THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

type ColorFamily = (typeof COLORS)[keyof typeof COLORS];
type ColorTone = ColorFamily[keyof ColorFamily];
type CommonColors =
  | 'danger'
  | 'dark'
  | 'info'
  | 'light'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning';
type FontTheme = { families: typeof FONTS; sizes: typeof fontSizes };

interface GlobalTheme {
  color: Readonly<Record<CommonColors, ColorTone>>;
  font: FontTheme;
}
interface Palette {
  readonly background: ColorTone;
  readonly shadow: ColorTone;
  readonly text: ColorTone;
}

export interface Theme {
  global: GlobalTheme;
  palette: Palette;
}

const global: GlobalTheme = {
  color: {
    danger: COLORS.RED._500,
    dark: COLORS.ZINC._950,
    info: COLORS.CYAN._500,
    light: COLORS.ZINC._50,
    primary: COLORS.BLUE._500,
    secondary: COLORS.GRAY._500,
    success: COLORS.GREEN._500,
    warning: COLORS.YELLOW._500,
  },
  font: {
    families: FONTS,
    sizes: fontSizes,
  },
};

export const LightTheme: Theme = {
  global,
  palette: {
    background: COLORS.GRAY._100,
    shadow: COLORS.GRAY._900,
    text: COLORS.GRAY._900,
  },
};

export const DarkTheme: Theme = {
  global,
  palette: {
    background: COLORS.GRAY._800,
    shadow: COLORS.GRAY._50,
    text: COLORS.GRAY._50,
  },
};
