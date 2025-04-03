/* eslint-disable @custom-typescript/no-direct-hook-imports */
import { useI18n } from 'src/contexts/I18nContext';
import { useTheme } from 'src/contexts/ThemeContext';
import { useNavigation, useRoute } from 'src/navigations/RootStackParamList';
import { useCounter, useGlobalText } from 'src/stores/useStore';

export {
  useNavigation as useAppNavigation,
  useRoute as useAppRoute,
  useTheme as useAppTheme,
  useI18n as useAppI18n,
  useCounter as useAppCounter,
  useGlobalText as useAppGlobalText,
};
