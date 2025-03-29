import {
  useNavigation as nativeUseNavigation,
  useRoute as nativeUseRoute,
  type NavigationProp,
  type RouteProp,
} from '@react-navigation/native';

export const enum NavigationNames {
  HOME = 'Home',
  ABOUT = 'About',
}

export type RootStackParamList = {
  [NavigationNames.HOME]: undefined;
  [NavigationNames.ABOUT]: { name: string };
};

export const useNavigation = (): NavigationProp<RootStackParamList> =>
  nativeUseNavigation<NavigationProp<RootStackParamList>>();

export const useRoute = <T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
> => nativeUseRoute<RouteProp<RootStackParamList, T>>();
