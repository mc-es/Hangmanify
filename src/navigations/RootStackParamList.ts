import {
  type NavigationProp,
  type RouteProp,
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from '@react-navigation/native';

export const enum RouteNames {
  ABOUT = 'About',
  HOME = 'Home',
}

export type RootStackParamList = {
  [RouteNames.ABOUT]: { name: string };
  [RouteNames.HOME]: undefined;
};

export const useNavigation = (): NavigationProp<RootStackParamList> =>
  useNativeNavigation<NavigationProp<RootStackParamList>>();

export const useRoute = <T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
> => useNativeRoute<RouteProp<RootStackParamList, T>>();
