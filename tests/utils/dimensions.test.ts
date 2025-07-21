import { PixelRatio } from 'react-native';

import { dimensions } from 'src/utils/dimensions';

jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
  },
  PixelRatio: {
    getFontScale: jest.fn().mockReturnValue(1),
    roundToNearestPixel: jest.fn((val: number) => Math.round(val)),
  },
}));

const dimensionEdgeCases = [
  // hs
  {
    name: 'hs: scales horizontal size correctly',
    code: () => dimensions.hs(16),
    expected: 12,
  },
  // vs
  {
    name: 'vs: scales vertical size correctly',
    code: () => dimensions.vs(16),
    expected: 16,
  },
  // wp
  {
    name: 'wp: calculates width percentage correctly',
    code: () => dimensions.wp(50),
    expected: 187.5,
  },
  {
    name: 'wp: clamps percentages less than 0',
    code: () => dimensions.wp(-10),
    expected: 0,
  },
  {
    name: 'wp: clamps percentages more than 100',
    code: () => dimensions.wp(150),
    expected: 375,
  },
  // hp
  {
    name: 'hp: calculates height percentage correctly',
    code: () => dimensions.hp(25),
    expected: 203,
  },
  // ms
  {
    name: 'ms: applies moderate scaling with default factor',
    code: () => dimensions.ms(20),
    expected: 17.5,
  },
  {
    name: 'ms: applies moderate scaling with custom factor',
    code: () => dimensions.ms(20, 1),
    expected: 15,
  },
  // fs
  {
    name: 'fs: scales font size with font scale 1',
    code: () => dimensions.fs(18),
    expected: 14,
  },
];

describe('dimensions utils', () => {
  dimensionEdgeCases.forEach(({ name, code, expected }) => {
    it(name, () => {
      const result = code();
      expect(result).toBeCloseTo(expected);
      expect(result).toMatchSnapshot();
    });
  });

  it('fs: scales font size with font scale 1.2', () => {
    (PixelRatio.getFontScale as jest.Mock).mockReturnValue(1.2);
    const result = dimensions.fs(10);
    expect(result).toBe(9);
    expect(result).toMatchSnapshot();
  });

  it('snapshot: matches all outputs together', () => {
    const snapshotData = {
      hs: dimensions.hs(16),
      vs: dimensions.vs(16),
      wp: dimensions.wp(50),
      wpNegative: dimensions.wp(-10),
      wpOver: dimensions.wp(150),
      hp: dimensions.hp(25),
      msDefault: dimensions.ms(20),
      msCustom: dimensions.ms(20, 1),
      fsNormal: dimensions.fs(18),
    };
    expect(snapshotData).toMatchSnapshot();
  });
});
