import { Dimensions as NativeDimensions, PixelRatio } from 'react-native';

const { height: deviceHeight, width: deviceWidth } = NativeDimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const BLEND_ZONE = 5;

const BREAKPOINTS = {
  '2xl': { scale: 1.4, size: 840 },
  '2xs': { scale: 0.65, size: 320 },
  lg: { scale: 1.1, size: 600 },
  'lg-xl': { scale: 1.15, size: 680 },
  md: { scale: 1, size: 480 },
  'md-lg': { scale: 1.05, size: 540 },
  sm: { scale: 0.85, size: 390 },
  'sm-md': { scale: 0.9, size: 420 },
  xl: { scale: 1.2, size: 760 },
  'xl-2xl': { scale: 1.3, size: 800 },
  xs: { scale: 0.75, size: 360 },
  'xs-2xs': { scale: 0.7, size: 340 },
  'xs-sm': { scale: 0.75, size: 375 },
} as const;

const easeIn = (t: number): number => t * t;
const easeOut = (t: number): number => t * (2 - t);

const getScale = (width: number): number => {
  const breakpoints = Object.values(BREAKPOINTS).sort((x, y) => x.size - y.size);

  if (width <= breakpoints[0].size) return breakpoints[0].scale;
  if (width >= breakpoints[breakpoints.length - 1].size)
    return breakpoints[breakpoints.length - 1].scale;

  for (let i = 0; i < breakpoints.length - 1; i++) {
    const current = breakpoints[i];
    const next = breakpoints[i + 1];

    if (width >= current.size && width < next.size) {
      const scaleRange = next.scale - current.scale;
      const widthRange = next.size - current.size;
      const delta = width - current.size;

      let finalProgress;

      if (delta < BLEND_ZONE) {
        const t = delta / BLEND_ZONE;
        finalProgress = easeIn(t) * (BLEND_ZONE / widthRange);
      } else if (delta > widthRange - BLEND_ZONE) {
        const t = (delta - (widthRange - BLEND_ZONE)) / BLEND_ZONE;
        finalProgress =
          (widthRange - BLEND_ZONE) / widthRange + easeOut(t) * (BLEND_ZONE / widthRange);
      } else finalProgress = delta / widthRange;

      return current.scale + scaleRange * finalProgress;
    }
  }

  return 1;
};

const scale = getScale(deviceWidth);

// horizontal & vertical scale
const hs = (size: number): number => (deviceWidth / guidelineBaseWidth) * size * scale;
const vs = (size: number): number => (deviceHeight / guidelineBaseHeight) * size;

// width & height percent
const clampPercent = (percent: number): number => Math.max(0, Math.min(100, percent));
const wp = (percent: number): number => (deviceWidth * clampPercent(percent)) / 100;
const hp = (percent: number): number => (deviceHeight * clampPercent(percent)) / 100;

// moderate scale
const ms = (size: number, factor = 0.5): number => size + (hs(size) - size) * factor;

// font scale
const fs = (size: number): number => {
  const fontScale = PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(hs(size) * fontScale));
};

export const Dimensions = { fs, hp, hs, ms, vs, wp };
