import * as Font from 'expo-font';

import { FONTS } from 'src/constants/styles/fonts';

import {
  NunitoBold,
  NunitoLight,
  NunitoMedium,
  NunitoRegular,
  NunitoSemiBold,
} from 'assets/fonts/nunito';
import {
  PoppinsBold,
  PoppinsLight,
  PoppinsMedium,
  PoppinsRegular,
  PoppinsSemiBold,
} from 'assets/fonts/poppins';

export const loadFonts = async (): Promise<void> => {
  try {
    await Font.loadAsync({
      [FONTS.Nunito.Bold]: NunitoBold,
      [FONTS.Nunito.Light]: NunitoLight,
      [FONTS.Nunito.Medium]: NunitoMedium,
      [FONTS.Nunito.Regular]: NunitoRegular,
      [FONTS.Nunito.SemiBold]: NunitoSemiBold,
      [FONTS.Poppins.Bold]: PoppinsBold,
      [FONTS.Poppins.Light]: PoppinsLight,
      [FONTS.Poppins.Medium]: PoppinsMedium,
      [FONTS.Poppins.Regular]: PoppinsRegular,
      [FONTS.Poppins.SemiBold]: PoppinsSemiBold,
    });
  } catch (error) {
    console.error('Error loading fonts', error);
  }
};
