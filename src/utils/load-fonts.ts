import * as Font from 'expo-font';

import { APP_FONTS } from 'assets/fonts';

import { FONTS } from 'src/constants/styles';

export const LoadFonts = async (): Promise<void> => {
  try {
    await Font.loadAsync({
      [FONTS.Nunito.Bold]: APP_FONTS.nunito.bold,
      [FONTS.Nunito.Light]: APP_FONTS.nunito.light,
      [FONTS.Nunito.Medium]: APP_FONTS.nunito.medium,
      [FONTS.Nunito.Regular]: APP_FONTS.nunito.regular,
      [FONTS.Nunito.SemiBold]: APP_FONTS.nunito.semibold,
      [FONTS.Poppins.Bold]: APP_FONTS.poppins.bold,
      [FONTS.Poppins.Light]: APP_FONTS.poppins.light,
      [FONTS.Poppins.Medium]: APP_FONTS.poppins.medium,
      [FONTS.Poppins.Regular]: APP_FONTS.poppins.regular,
      [FONTS.Poppins.SemiBold]: APP_FONTS.poppins.semibold,
    });
  } catch (error) {
    console.error('Error loading fonts', error);
  }
};
