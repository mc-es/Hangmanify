enum NunitoFont {
  Bold = 'Nunito-Bold',
  Light = 'Nunito-Light',
  Medium = 'Nunito-Medium',
  Regular = 'Nunito-Regular',
  SemiBold = 'Nunito-SemiBold',
}
enum PoppinsFont {
  Bold = 'Poppins-Bold',
  Light = 'Poppins-Light',
  Medium = 'Poppins-Medium',
  Regular = 'Poppins-Regular',
  SemiBold = 'Poppins-SemiBold',
}

export const FONTS = {
  Nunito: NunitoFont,
  Poppins: PoppinsFont,
} as const;
