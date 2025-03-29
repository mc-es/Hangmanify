import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export const enum RootNavigations {
  HOME = 'Home',
  ABOUT = 'About',
}

export type RootStackParamList = {
  [RootNavigations.HOME]: undefined;
  [RootNavigations.ABOUT]: undefined;
};

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type ScreenNRProps = {
  Home: ScreenProps<RootNavigations.HOME>;
  About: ScreenProps<RootNavigations.ABOUT>;
};
