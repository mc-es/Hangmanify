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

function useNavigation(): never;
function useNavigation<T extends keyof RootStackParamList>(): NavigationProp<
  RootStackParamList,
  T
>;
function useNavigation<T extends keyof RootStackParamList>(): NavigationProp<
  RootStackParamList,
  T
> {
  return useNativeNavigation<NavigationProp<RootStackParamList, T>>();
}
function useRoute(): never;
function useRoute<T extends keyof RootStackParamList>(): RouteProp<RootStackParamList, T>;
function useRoute<T extends keyof RootStackParamList>(): RouteProp<
  RootStackParamList,
  T
> {
  return useNativeRoute<RouteProp<RootStackParamList, T>>();
}

export { useNavigation, useRoute };
