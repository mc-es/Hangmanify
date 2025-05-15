import {
  useNavigation as nativeUseNavigation,
  useRoute as nativeUseRoute,
  type NavigationProp,
  type RouteProp,
} from '@react-navigation/native';

export const enum NavigationNames {
  ABOUT = 'About',
  HOME = 'Home',
}

export type RootStackParamList = {
  [NavigationNames.ABOUT]: { name: string };
  [NavigationNames.HOME]: undefined;
};

export const useNavigation = (): NavigationProp<RootStackParamList> =>
  nativeUseNavigation<NavigationProp<RootStackParamList>>();

export const useRoute = <T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
> => nativeUseRoute<RouteProp<RootStackParamList, T>>();
