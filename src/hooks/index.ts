/* eslint-disable @custom-typescript/no-direct-hook-imports */
import { useI18n } from 'src/contexts/I18nContext';
import { useTheme } from 'src/contexts/ThemeContext';
import { useNavigation, useRoute } from 'src/navigations/RootStackParamList';
import { useCounter, useGlobalText } from 'src/stores/useStore';

export { useI18n };
export { useTheme };
export { useNavigation, useRoute };
export { useCounter, useGlobalText };
