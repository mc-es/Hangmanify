import { Dimensions as NativeDimensions, PixelRatio } from 'react-native';

const { width: deviceWidth, height: deviceHeight } = NativeDimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
const BLEND_ZONE = 5;

const BREAKPOINTS = {
  '2xs': { size: 320, scale: 0.65 },
  'xs-2xs': { size: 340, scale: 0.7 },
  xs: { size: 360, scale: 0.75 },
  'xs-sm': { size: 375, scale: 0.75 },
  sm: { size: 390, scale: 0.85 },
  'sm-md': { size: 420, scale: 0.9 },
  md: { size: 480, scale: 1 },
  'md-lg': { size: 540, scale: 1.05 },
  lg: { size: 600, scale: 1.1 },
  'lg-xl': { size: 680, scale: 1.15 },
  xl: { size: 760, scale: 1.2 },
  'xl-2xl': { size: 800, scale: 1.3 },
  '2xl': { size: 840, scale: 1.4 },
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
const wp = (percent: number): number => (deviceWidth * percent) / 100;
const hp = (percent: number): number => (deviceHeight * percent) / 100;

// moderate scale
const ms = (size: number, factor = 0.5): number => size + (hs(size) - size) * factor;

// font scale
const fs = (size: number): number => {
  const fontScale = PixelRatio.getFontScale();
  return Math.round(PixelRatio.roundToNearestPixel(hs(size) * fontScale));
};

export const Dimensions = { hs, vs, wp, hp, ms, fs };
